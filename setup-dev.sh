#!/bin/bash

# setup-dev.sh
# Usage: ./setup-dev.sh /path/to/dev-folder

TARGET_DIR=$1

if [ -z "$TARGET_DIR" ]; then
    echo "Usage: ./setup-dev.sh <target-directory>"
    exit 1
fi

echo "🚀 Preparing dev folder at: $TARGET_DIR"

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Sync files excluding large/unnecessary directories
# We use rsync to efficiently copy files
rsync -av --progress . "$TARGET_DIR" \
    --exclude "node_modules" \
    --exclude ".git" \
    --exclude "generated-sites" \
    --exclude "dist" \
    --exclude ".netlify"

echo "✅ Files copied."
echo ""
echo "👉 Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. Edit .env and change BOT_TOKEN to a dev bot token."
echo "3. Run 'npm install' to install dependencies."
echo "4. Run 'npm run dev:bot' to start the dev instance."
echo ""
echo "⚠️ IMPORTANT: Don't forget that the Docker container is still running in the original folder!"
