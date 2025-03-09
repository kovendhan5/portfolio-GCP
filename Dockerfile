# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Remove or move Firebase functions directory (if it exists) before building
RUN if [ -d "functions" ]; then \
    echo "Found Firebase functions directory, moving it temporarily"; \
    mkdir -p /tmp/functions-backup; \
    mv functions /tmp/functions-backup; \
    fi

# Build as a static site
ENV NODE_ENV=production

# Create a proper next.config.js file without newline issues
RUN echo '/** @type {import("next").NextConfig} */' > next.config.js && \
    echo 'const nextConfig = { output: "export" };' >> next.config.js && \
    echo 'module.exports = nextConfig;' >> next.config.js

# Build with increased memory limit
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npm run build

# Serve stage - using lightweight nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy the static files from build stage
COPY --from=build /app/out/ .

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://localhost/ || exit 1

# nginx will start automatically
CMD ["nginx", "-g", "daemon off;"]
