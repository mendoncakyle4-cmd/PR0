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

echo "=== Setting up HF Transformers Translation Service (IndicTrans2) ==="

# Create and activate virtual environment
echo -e "\n[1/6] Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install Python dependencies
echo -e "\n[2/4] Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo -e "\n[3/4] (Optional) Login to Hugging Face to increase rate limits"
if command_exists huggingface-cli; then
  echo "You can login by running: huggingface-cli login"
else
  pip install huggingface-hub
  echo "Installed huggingface-hub. You can login by running: huggingface-cli login"
fi

echo -e "\n[4/4] (Optional) Pre-download model weights to cache"
python - << 'PY'
try:
  from huggingface_hub import snapshot_download
  print("Downloading model: ai4bharat/indictrans2-en-indic-1B ...")
  snapshot_download(repo_id="ai4bharat/indictrans2-en-indic-1B")
  print("Model download complete.")
except Exception as e:
  print(f"Skipping predownload: {e}")
PY

echo -e "\n=== Installation Complete! ==="
echo -e "\nTo activate the virtual environment, run:
  source venv/bin/activate"

echo -e "\nTo start the translation service, run:
  python services/translation_service.py --http"

exit 0
