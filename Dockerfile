# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build as a static site
ENV NODE_ENV=production
# Preserve any existing configuration but ensure static export
RUN if [ -f next.config.js ]; then \
    sed -i 's/output:.*,/output: "export",/g' next.config.js || \
    sed -i 's/module.exports = {/module.exports = {\n  output: "export",/g' next.config.js || \
    echo '/** @type {import("next").NextConfig} */\nconst nextConfig = { output: "export" };\nmodule.exports = nextConfig;' > next.config.js; \
    else \
    echo '/** @type {import("next").NextConfig} */\nconst nextConfig = { output: "export" };\nmodule.exports = nextConfig;' > next.config.js; \
    fi

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
