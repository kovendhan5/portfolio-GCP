#!/bin/bash

# Clean up previous builds
echo "Cleaning up..."
docker system prune -f

# Build with verbose output
echo "Building Docker image..."
docker build -t portfolio:local . --no-cache

# Run container
echo "Running container..."
docker run -p 3000:3000 portfolio:local
