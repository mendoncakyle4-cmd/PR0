#!/bin/bash

set -e  # Exit on error

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Python version
PYTHON_VER=$(python3 -c 'import sys; print("{}.{}".format(sys.version_info.major, sys.version_info.minor))')
if [[ "$PYTHON_VER" < "3.8" ]]; then
    echo "Error: Python 3.8 or higher is required (found $PYTHON_VER)"
    exit 1
fi

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "=== Setting up IndicTrans2 Translation Service ==="

# Create and activate virtual environment
echo -e "\n[1/6] Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install Python dependencies
echo -e "\n[2/6] Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Install Fairseq
echo -e "\n[3/6] Installing Fairseq..."
if [ ! -d "fairseq" ]; then
    git clone https://github.com/facebookresearch/fairseq
    cd fairseq
    pip install --editable ./
    cd ..
fi

# Install Indic NLP Resources
echo -e "\n[4/6] Downloading Indic NLP resources..."
python -m indicnlp.download

# Install IndicTrans2
echo -e "\n[5/6] Installing IndicTrans2..."
if [ ! -d "IndicTrans2" ]; then
    echo "Cloning IndicTrans2 repository..."
    git clone https://github.com/AI4Bharat/IndicTrans2.git
fi
cd IndicTrans2
pip install -e .
cd ..

# Download the model
echo -e "\n[6/6] Downloading translation models..."
MODEL_DIR="models/indic-en"
mkdir -p "$MODEL_DIR"
if [ ! -f "$MODEL_DIR/README.md" ]; then
    wget -q --show-progress -P "$MODEL_DIR" https://ai4b-public-nlu-nlg.objectstore.e2enetworks.net/indic-en-1M.tar.gz
    tar -xzvf "$MODEL_DIR/indic-en-1M.tar.gz" -C "$MODEL_DIR/"
    rm "$MODEL_DIR/indic-en-1M.tar.gz"
fi

echo -e "\n=== Installation Complete! ==="
echo -e "\nTo activate the virtual environment, run:
  source venv/bin/activate"

echo -e "\nTo start the translation service, run:
  python services/translation_service.py"

exit 0
