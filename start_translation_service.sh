#!/bin/bash

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Activate the virtual environment
if [ -d "$SCRIPT_DIR/venv" ]; then
    source "$SCRIPT_DIR/venv/bin/activate"
else
    echo "Error: Virtual environment not found. Please run scripts/install_indic_trans2.sh first"
    exit 1
fi

# Set environment variables
export PYTHONPATH="$SCRIPT_DIR:$PYTHONPATH"

# Parse command line arguments
PORT=${1:-5000}
HOST=${2:-127.0.0.1}

# Start the translation service as HTTP server
echo "Starting IndicTrans2 Translation Service..."
echo "Server will be available at http://$HOST:$PORT"
echo "Press Ctrl+C to stop"
python "$SCRIPT_DIR/services/translation_service.py" --http --host "$HOST" --port "$PORT"
