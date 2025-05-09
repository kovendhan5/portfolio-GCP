# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
# If you are using npm:
RUN npm install --legacy-peer-deps
# If you are using yarn, uncomment the next line and comment out the npm install line
# RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Remove public/index.html to prevent it from overwriting Next.js generated index.html
RUN rm -f /app/public/index.html

# Build the Next.js application for static export
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.25-alpine AS runner

# Copy the static files from the builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy the Nginx configuration template that uses the PORT environment variable
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Expose port 8080 by default, Cloud Run will override this with the PORT env var
EXPOSE 8080

# Start Nginx after substituting the PORT environment variable in the config
# envsubst will replace ${PORT} in the template with the value of the PORT env var
# and output it to the actual Nginx config file.
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
