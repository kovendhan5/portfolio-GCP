#!/bin/bash

# Exit on error
set -e

# Clean up previous builds
echo "Cleaning up..."
docker system prune -f

# Build with progress output
echo "Building Docker image..."
docker build -t portfolio:local .

# Run container
echo "Running container..."
docker run -p 80:80 portfolio:local

# Help message
echo "Container is running on http://localhost"
echo "Press Ctrl+C to stop"
