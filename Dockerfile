# Build stage with dependency installation
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies with more verbose output
RUN npm install --verbose

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create an empty next.config.js if it doesn't exist
RUN if [ ! -f next.config.js ]; then echo "/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nmodule.exports = nextConfig;" > next.config.js; fi

# Create public directory in case it doesn't exist
RUN mkdir -p /app/public

# Build the application with additional debug information
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build || (echo "Build failed" && exit 1)

# Production stage - using slim node image
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/.next && \
    chown -R nextjs:nodejs /app

# Install only production dependencies
COPY package.json ./
RUN npm install --only=production && npm cache clean --force

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Install curl for health check and other necessary tools
USER root
RUN apk --no-cache add curl

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check with appropriate timeout
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["npm", "start"]
