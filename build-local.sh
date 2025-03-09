#!/bin/bash

# Exit on error
set -e

# Clean up previous builds
echo "Cleaning up..."
docker system prune -f

# Build with verbose output and no cache
echo "Building Docker image..."
DOCKER_BUILDKIT=1 docker build -t portfolio:local .

# Test the build
echo "Running basic tests..."
docker run --rm portfolio:local node -e "console.log('Node.js is working')"

# Run container
echo "Running container..."
docker run -p 3000:3000 portfolio:local

# Help message
echo "Container is running on http://localhost:3000"
echo "Press Ctrl+C to stop"
