#!/bin/bash

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install -U pip setuptools wheel
pip install -U sacremoses indic-nlp-library
pip install -U mosestokenizer
pip install -U pandas
pip install -U sacrebleu tensorboardX pyarrow
pip install -U indic-nlp-library
pip install -U fastBPE sacremoses pandas
pip install -U submitit
pip install -U scikit-learn
pip install -U transformers
pip install -U sentencepiece

# Install Fairseq
cd ..
git clone https://github.com/facebookresearch/fairseq
cd fairseq
pip install --editable ./
cd ..

# Install Indic NLP Resources
python -m indicnlp.download

# Install IndicTrans2
cd IndicTrans2
pip install -e .

# Download the model
mkdir -p ../models/indic-en
wget -P ../models/indic-en https://ai4b-public-nlu-nlg.objectstore.e2enetworks.net/indic-en-1M.tar.gz
tar -xzvf ../models/indic-en/indic-en-1M.tar.gz -C ../models/indic-en/

# Install ctranslate2 for faster inference (optional)
pip install ctranslate2

# Install Node.js dependencies
cd ..
npm install child_process

echo "Installation complete! Don't forget to activate the virtual environment with 'source venv/bin/activate' before running the translation service."
