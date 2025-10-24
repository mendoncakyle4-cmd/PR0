import sys
import json
import hashlib
import time
from pathlib import Path
from typing import List, Dict, Optional, Tuple, Any
import logging
from functools import lru_cache
import signal
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor, as_completed

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('translation_service.log')
    ]
)
logger = logging.getLogger(__name__)

# Global flag for graceful shutdown
SHUTDOWN = False

# Configuration
DEFAULT_BATCH_SIZE = 16
DEFAULT_BEAM_SIZE = 5
MAX_INPUT_LENGTH = 2000
CACHE_SIZE = 10000  # Number of translations to cache
MODEL_LOAD_TIMEOUT = 300  # 5 minutes

@dataclass
class TranslationConfig:
    batch_size: int = DEFAULT_BATCH_SIZE
    beam_size: int = DEFAULT_BEAM_SIZE
    max_length: int = 200
    length_penalty: float = 1.0
    no_repeat_ngram_size: int = 3
    temperature: float = 1.0

class TranslationError(Exception):
    """Custom exception for translation errors"""
    pass

class ModelLoadError(TranslationError):
    """Raised when model fails to load"""
    pass

class InvalidInputError(TranslationError):
    """Raised when input is invalid"""
    pass

class ModelTimeoutError(TranslationError):
    """Raised when model operation times out"""
    pass

class TranslationService:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(TranslationService, cls).__new__(cls)
                    cls._instance._initialized = False
        return cls._instance
    
    def __init__(self, model_dir: str = "../models/indic-en"):
        """
        Initialize the translation service with the IndicTrans2 model.
        
        Args:
            model_dir: Path to the directory containing the model files
        """
        if self._initialized:
            return
            
        self.model_dir = Path(model_dir).resolve()
        self.model = None
        self.tokenizer = None
        self.detokenizer = None
        self.sentence_splitter = None
        self.executor = ThreadPoolExecutor(max_workers=4)
        self._cache = {}
        self._cache_order = []
        self._initialized = False
        self._model_loading = False
        self._last_used = time.time()
        
        # Set up signal handlers for graceful shutdown
        signal.signal(signal.SIGINT, self._handle_shutdown)
        signal.signal(signal.SIGTERM, self._handle_shutdown)
        
        # Start model loading in background
        self._start_async_initialization()
        
    def _start_async_initialization(self):
        """Start model loading in a background thread."""
        if self._initialized or self._model_loading:
            return
            
        self._model_loading = True
        logger.info("Starting async model loading...")
        
        def _load_model():
            try:
                self._initialize_model()
                logger.info("Model loaded successfully")
            except Exception as e:
                logger.error(f"Failed to load model: {str(e)}")
                self._model_loading = False
            
        # Start model loading in a separate thread
        threading.Thread(target=_load_model, daemon=True).start()
    
    def _initialize_model(self):
        """Initialize the translation model and related components."""
        try:
            logger.info("Initializing translation model...")
            start_time = time.time()
            
            # Import required libraries with lazy loading
            from indic_transliteration import sanscript
            from indic_transliteration.sanscript import SchemeMap, SCHEMES, transliterate
            from indicnlp.tokenize import sentence_tokenize
            from mosestokenizer import MosesTokenizer, MosesDetokenizer
            from fairseq import checkpoint_utils
            import torch
            
            # Set up paths
            self.model_path = self.model_dir / "model.pt"
            self.dict_path = self.model_dir / "vocab"
            
            if not self.model_path.exists() or not self.dict_path.exists():
                raise ModelLoadError(
                    f"Model files not found in {self.model_dir}. "
                    "Please ensure you've downloaded the model files."
                )
            
            # Load model with timeout
            def load_model_with_timeout():
                models, _ = checkpoint_utils.load_model_ensemble(
                    [str(self.model_path)],
                    arg_overrides={"data": str(self.dict_path)},
                )
                return models[0]
                
            # Run model loading with timeout
            future = self.executor.submit(load_model_with_timeout)
            try:
                self.model = future.result(timeout=MODEL_LOAD_TIMEOUT)
            except TimeoutError:
                raise ModelTimeoutError(f"Model loading timed out after {MODEL_LOAD_TIMEOUT} seconds")
            
            # Move model to GPU if available
            self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            self.model = self.model.to(self.device)
            self.model.eval()  # Set to evaluation mode
            
            # Initialize tokenizers
            self.sentence_splitter = sentence_tokenize
            self.tokenizer = MosesTokenizer('en')
            self.detokenizer = MosesDetokenizer('en')
            
            # Warm up the model
            self._warmup_model()
            
            self._initialized = True
            self._model_loading = False
            
            load_time = time.time() - start_time
            logger.info(f"Model initialized in {load_time:.2f} seconds on {self.device}")
            
        except Exception as e:
            logger.exception("Failed to initialize translation model")
            self._initialized = False
            self._model_loading = False
            raise ModelLoadError(f"Failed to initialize model: {str(e)}")
    
    def _warmup_model(self):
        """Warm up the model with sample translations."""
        logger.info("Warming up model...")
        warmup_samples = [
            ("Hello, how are you?", "en", "hi"),
            ("This is a test.", "en", "hi"),
            ("नमस्ते, आप कैसे हैं?", "hi", "en"),
        ]
        
        for text, src, tgt in warmup_samples:
            try:
                self._translate_batch([text], src, tgt)
            except Exception as e:
                logger.warning(f"Warmup failed for {src}->{tgt}: {str(e)}")
    
    def _handle_shutdown(self, signum, frame):
        """Handle shutdown signals gracefully."""
        global SHUTDOWN
        SHUTDOWN = True
        logger.info("Shutdown signal received, cleaning up...")
        self.cleanup()
        sys.exit(0)
    
    def cleanup(self):
        """Clean up resources."""
        logger.info("Cleaning up resources...")
        if hasattr(self, 'executor'):
            self.executor.shutdown(wait=False)
        if hasattr(self, 'tokenizer'):
            del self.tokenizer
        if hasattr(self, 'detokenizer'):
            del self.detokenizer
        if hasattr(self, 'model'):
            del self.model
        torch.cuda.empty_cache()
        self._initialized = False
        logger.info("Cleanup completed")
    
    def _get_cache_key(self, text: str, src_lang: str, tgt_lang: str) -> str:
        """Generate a cache key for the translation request."""
        key_str = f"{src_lang}:{tgt_lang}:{text}"
        return hashlib.md5(key_str.encode('utf-8')).hexdigest()
    
    def _get_from_cache(self, key: str) -> Optional[str]:
        """Get a translation from cache if it exists."""
        if key in self._cache:
            # Update access time for LRU
            self._cache_order.remove(key)
            self._cache_order.append(key)
            return self._cache[key]
        return None
    
    def _add_to_cache(self, key: str, translation: str):
        """Add a translation to the cache."""
        if len(self._cache) >= CACHE_SIZE:
            # Remove least recently used item
            oldest_key = self._cache_order.pop(0)
            del self._cache[oldest_key]
        
        self._cache[key] = translation
        self._cache_order.append(key)
    
    def preprocess(self, text: str, lang: str) -> Tuple[List[str], List[int]]:
        """
        Preprocess the input text for translation.
        
        Args:
            text: Input text to preprocess
            lang: Source language code
            
        Returns:
            Tuple of (sentences, sentence_lengths)
        """
        if not text.strip():
            return [], []
            
        try:
            # Clean and normalize text
            text = ' '.join(text.strip().split())
            
            # Split into sentences
            sentences = self.sentence_splitter.sent_tokenize(text, lang=lang)
            
            # Filter out empty sentences
            sentences = [s for s in sentences if s.strip()]
            sentence_lengths = [len(s) for s in sentences]
            
            return sentences, sentence_lengths
            
        except Exception as e:
            logger.error(f"Preprocessing failed: {str(e)}")
            raise InvalidInputError(f"Failed to preprocess text: {str(e)}")
    
    def postprocess(self, translated_sentences: List[str], sentence_lengths: List[int]) -> str:
        """
        Postprocess the translated sentences into a single string.
        
        Args:
            translated_sentences: List of translated sentences
            sentence_lengths: Original sentence lengths for reordering if needed
            
        Returns:
            Postprocessed text
        """
        if not translated_sentences:
            return ""
            
        try:
            # Join sentences with appropriate spacing
            return ' '.join(translated_sentences)
            
        except Exception as e:
            logger.error(f"Postprocessing failed: {str(e)}")
            # Return the best effort result
            return ' '.join(translated_sentences)
    
    def _translate_batch(
        self,
        sentences: List[str],
        src_lang: str,
        tgt_lang: str,
        config: Optional[TranslationConfig] = None
    ) -> List[str]:
        """
        Translate a batch of sentences.
        
        Args:
            sentences: List of sentences to translate
            src_lang: Source language code
            tgt_lang: Target language code
            config: Translation configuration
            
        Returns:
            List of translated sentences
        """
        if not self._initialized:
            raise ModelLoadError("Translation model is not initialized")
            
        if not sentences:
            return []
            
        config = config or TranslationConfig()
        
        try:
            # Tokenize input
            tokenized = [self.tokenizer.tokenize(sent) for sent in sentences]
            
            # TODO: Implement actual translation with the model
            # This is a placeholder implementation
            translated = [
                f"[Translated from {src_lang} to {tgt_lang}]: {sent}"
                for sent in sentences
            ]
            
            return translated
            
        except Exception as e:
            logger.exception(f"Batch translation failed: {str(e)}")
            raise TranslationError(f"Failed to translate batch: {str(e)}")
    
    def translate(
        self,
        text: str,
        src_lang: str = 'en',
        tgt_lang: str = 'hi',
        config: Optional[TranslationConfig] = None
    ) -> str:
        """
        Translate text from source language to target language.
        
        Args:
            text: Input text to translate
            src_lang: Source language code (e.g., 'en', 'hi')
            tgt_lang: Target language code (e.g., 'hi', 'ta')
            config: Optional translation configuration
            
        Returns:
            Translated text
            
        Raises:
            InvalidInputError: If input is invalid
            ModelLoadError: If model fails to load
            TranslationError: If translation fails
        """
        if SHUTDOWN:
            raise TranslationError("Service is shutting down")
            
        if not text or not isinstance(text, str) or not text.strip():
            raise InvalidInputError("Input text cannot be empty")
            
        if len(text) > MAX_INPUT_LENGTH:
            raise InvalidInputError(f"Input text exceeds maximum length of {MAX_INPUT_LENGTH} characters")
            
        # Check if we have a cached result
        cache_key = self._get_cache_key(text, src_lang, tgt_lang)
        cached = self._get_from_cache(cache_key)
        if cached is not None:
            logger.debug(f"Cache hit for {src_lang}->{tgt_lang}: {text[:50]}...")
            return cached
            
        # Wait for model initialization if needed
        if not self._initialized and not self._model_loading:
            self._start_async_initialization()
            
        if not self._initialized:
            # If model is still loading, wait with timeout
            start_time = time.time()
            while not self._initialized and time.time() - start_time < MODEL_LOAD_TIMEOUT:
                time.sleep(0.1)
                
            if not self._initialized:
                raise ModelLoadError("Translation model is not ready")
        
        try:
            # Update last used time
            self._last_used = time.time()
            
            # Preprocess the input text
            sentences, sentence_lengths = self.preprocess(text, src_lang)
            
            if not sentences:
                return ""
                
            # Translate in batches
            translated_sentences = self._translate_batch(sentences, src_lang, tgt_lang, config)
            
            # Postprocess the translated sentences
            translated_text = self.postprocess(translated_sentences, sentence_lengths)
            
            # Cache the result
            self._add_to_cache(cache_key, translated_text)
            
            return translated_text
            
        except TranslationError:
            raise
        except Exception as e:
            logger.exception("Translation failed")
            raise TranslationError(f"Translation failed: {str(e)}")
    
    async def translate_async(
        self,
        text: str,
        src_lang: str = 'en',
        tgt_lang: str = 'hi',
        config: Optional[TranslationConfig] = None
    ) -> str:
        """
        Asynchronous version of translate method.
        
        Args:
            text: Input text to translate
            src_lang: Source language code
            tgt_lang: Target language code
            config: Optional translation configuration
            
        Returns:
            Translated text
        """
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(
            self.executor,
            lambda: self.translate(text, src_lang, tgt_lang, config)
        )

def main():
    """Command-line interface for testing the translation service."""
    import argparse
    import time
    
    parser = argparse.ArgumentParser(description='IndicTrans2 Translation Service')
    parser.add_argument('text', nargs='?', help='Text to translate')
    parser.add_argument('--src', default='en', help='Source language code (default: en)')
    parser.add_argument('--tgt', default='hi', help='Target language code (default: hi)')
    parser.add_argument('--batch-size', type=int, default=DEFAULT_BATCH_SIZE, 
                       help=f'Batch size for translation (default: {DEFAULT_BATCH_SIZE})')
    parser.add_argument('--beam-size', type=int, default=DEFAULT_BEAM_SIZE,
                       help=f'Beam size for decoding (default: {DEFAULT_BEAM_SIZE})')
    parser.add_argument('--interactive', action='store_true', help='Interactive mode')
    parser.add_argument('--benchmark', action='store_true', help='Run benchmark')
    parser.add_argument('--cache-size', type=int, default=CACHE_SIZE,
                       help=f'Cache size (default: {CACHE_SIZE})')
    
    args = parser.parse_args()
    
    # Initialize translator
    translator = TranslationService()
    
    if args.benchmark:
        run_benchmark(translator)
        return
        
    if args.interactive or not args.text:
        interactive_mode(translator, args)
    else:
        # Single translation
        try:
            start_time = time.time()
            
            config = TranslationConfig(
                batch_size=args.batch_size,
                beam_size=args.beam_size
            )
            
            translated = translator.translate(args.text, args.src, args.tgt, config)
            
            elapsed = (time.time() - start_time) * 1000  # ms
            
            print("\n" + "=" * 80)
            print(f"Source ({args.src}): {args.text}")
            print("-" * 80)
            print(f"Target ({args.tgt}): {translated}")
            print("-" * 80)
            print(f"Translation took {elapsed:.2f} ms")
            print("=" * 80)
            
        except Exception as e:
            print(f"\nError: {str(e)}", file=sys.stderr)
            sys.exit(1)

def interactive_mode(translator, args):
    """Run the translation service in interactive mode."""
    print("IndicTrans2 Translation Service (Interactive Mode)")
    print("Type 'quit' or 'exit' to quit\n")
    
    while True:
        try:
            # Get input
            text = input(f"Enter text to translate ({args.src}->{args.tgt}): ")
            
            if text.lower() in ('quit', 'exit'):
                break
                
            if not text.strip():
                continue
                
            # Translate
            start_time = time.time()
            translated = translator.translate(text, args.src, args.tgt)
            elapsed = (time.time() - start_time) * 1000  # ms
            
            # Show result
            print("\n" + "-" * 80)
            print(f"Translated: {translated}")
            print(f"Time: {elapsed:.2f} ms")
            print("-" * 80 + "\n")
            
        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except Exception as e:
            print(f"\nError: {str(e)}\n")

def run_benchmark(translator):
    """Run a benchmark test on the translation service."""
    print("Running benchmark...\n")
    
    test_cases = [
        ("Hello, how are you?", "en", "hi"),
        ("This is a test of the translation service.", "en", "hi"),
        ("The quick brown fox jumps over the lazy dog.", "en", "hi"),
        ("नमस्ते, आप कैसे हैं?", "hi", "en"),
        ("यह एक परीक्षण है।", "hi", "ta"),
    ]
    
    total_time = 0
    total_chars = 0
    
    for i, (text, src, tgt) in enumerate(test_cases, 1):
        try:
            print(f"Test {i}: {src} -> {tgt}")
            print(f"  Input: {text}")
            
            start_time = time.time()
            translated = translator.translate(text, src, tgt)
            elapsed = (time.time() - start_time) * 1000  # ms
            
            print(f"  Output: {translated}")
            print(f"  Time: {elapsed:.2f} ms\n")
            
            total_time += elapsed
            total_chars += len(text)
            
        except Exception as e:
            print(f"  Error: {str(e)}\n")
    
    # Print summary
    print("\nBenchmark Summary:")
    print("-" * 40)
    print(f"Total tests: {len(test_cases)}")
    print(f"Total characters: {total_chars}")
    print(f"Total time: {total_time:.2f} ms")
    print(f"Average time per test: {total_time/len(test_cases):.2f} ms")
    if total_time > 0:
        print(f"Characters per second: {total_chars/(total_time/1000):.2f}")
    print("-" * 40)

if __name__ == "__main__":
    main()
