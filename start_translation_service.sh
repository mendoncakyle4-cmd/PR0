#!/bin/bash

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Activate the virtual environment
source "$SCRIPT_DIR/venv/bin/activate"

# Set environment variables
export PYTHONPATH="$SCRIPT_DIR:$PYTHONPATH"

# Start the translation service
echo "Starting Translation Service..."
python "$SCRIPT_DIR/services/translation_service.py"
