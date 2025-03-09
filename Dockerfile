# Use Node 20 Alpine as the base image for all stages
FROM node:20-alpine AS base
WORKDIR /app

# Dependencies stage: install and cache node_modules
FROM base AS deps
# Install build toolchain for native dependencies
RUN apk add --no-cache libc6-compat python3 make g++

# Copy package files only (for better caching)
COPY package.json ./

# Install all dependencies (including dev)
RUN npm install

# Builder stage
FROM base AS builder
WORKDIR /app

# Set Next.js telemetry to disabled
ENV NEXT_TELEMETRY_DISABLED=1

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create minimal next.config.js if needed
RUN if [ ! -f next.config.js ]; then \
    echo "/** @type {import('next').NextConfig} */\nconst nextConfig = { output: 'standalone' };\nmodule.exports = nextConfig;" > next.config.js; \
    fi

# Create public directory if it doesn't exist
RUN mkdir -p public

# Increase memory limit for build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Run the build
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Copy standalone build output from builder
# This will grab only what's needed for production
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Use non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Add health check (install curl first)
USER root
RUN apk --no-cache add curl
USER nextjs

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Run app
CMD ["node", "server.js"]
