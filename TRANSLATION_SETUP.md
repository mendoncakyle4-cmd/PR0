# IndicTrans2 Translation Setup

This guide will help you set up IndicTrans2 translation backend for the Regional Narrative Engine.

## Prerequisites

- Python 3.8 or higher
- Git
- 10GB+ free disk space (for models)
- CUDA-capable GPU (optional, for faster inference)

## Installation Steps

### 1. Install IndicTrans2 and Dependencies

Run the installation script:

```bash
cd chorus-bot
chmod +x scripts/install_indic_trans2.sh
./scripts/install_indic_trans2.sh
```

This script will:
- Create a Python virtual environment
- Install all required dependencies
- Clone the IndicTrans2 repository from GitHub
- Download pre-trained translation models

### 2. Start the Translation Service

Start the translation HTTP service:

```bash
./start_translation_service.sh
```

Or manually:

```bash
source venv/bin/activate
python services/translation_service.py --http --host 127.0.0.1 --port 5000
```

The service will be available at `http://127.0.0.1:5000`

### 3. Configure Environment Variables (Optional)

If you need to change the service URL, add to your `.env.local`:

```env
TRANSLATION_SERVICE_URL=http://127.0.0.1:5000
```

## API Endpoints

### Health Check
```
GET http://127.0.0.1:5000/health
```

### Translate
```
POST http://127.0.0.1:5000/translate
Content-Type: application/json

{
  "text": "Hello, how are you?",
  "sourceLang": "en",
  "targetLang": "hi"
}
```

Response:
```json
{
  "translatedText": "नमस्ते, आप कैसे हैं?",
  "sourceLang": "en",
  "targetLang": "hi",
  "timeMs": 123.45
}
```

## Supported Languages

The following languages are supported and aligned between frontend and backend:

- **English** (en)
- **Hindi** (hi)
- **Bengali** (bn)
- **Tamil** (ta)
- **Telugu** (te)
- **Kannada** (kn)
- **Malayalam** (ml)
- **Marathi** (mr)
- **Gujarati** (gu)
- **Punjabi** (pa)
- **Odia** (or)
- **Assamese** (as)
- **Urdu** (ur)
- **Nepali** (ne)
- **Sanskrit** (sa)
- **Manipuri** (mni)

Additional languages supported by IndicTrans2 backend (available for future use):
- Kashmiri (ks)
- Dogri (doi)
- Konkani (kok)
- Maithili (mai)
- Bodo (brx)
- Santali (sat)

## Integration with Next.js

The Next.js API route (`app/api/translate/route.ts`) connects to the local Python service for real translations.

Local development:
1. Start the Python service: `python services/translation_service.py --http`
2. Dev server: `npm run dev`

Production (Vercel):
- The API route includes a fallback translation (placeholder text) when the Python service is not reachable.
- For full fidelity translations in production, host the Python service and set `TRANSLATION_SERVICE_URL` in Vercel Project → Settings → Environment Variables.

## Troubleshooting

### Service not responding
- Check if the service is running: `curl http://127.0.0.1:5000/health`
- Check logs in `translation_service.log`

### Model loading fails
- Ensure you've logged in to Hugging Face: `huggingface-cli login` (or set `HUGGING_FACE_HUB_TOKEN`)
- Check disk space availability
- First run may take time to download weights

### Slow translations
- Use GPU if available (CUDA)
- Reduce batch size in `TranslationConfig`
- Check system resources

## Production Deployment

For production, use a process manager like `systemd` or `supervisor`:

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 2 -b 127.0.0.1:5000 "services.translation_service:app"
```

## References

- [ai4bharat/indictrans2-en-indic-1B](https://huggingface.co/ai4bharat/indictrans2-en-indic-1B)
- [Transformers pipeline docs](https://huggingface.co/docs/transformers/main_classes/pipelines)

