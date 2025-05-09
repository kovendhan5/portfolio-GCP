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

# Build the Next.js application for static export
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.25-alpine AS runner

# Copy the static files from the builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional, but recommended for Next.js routing)
# If you have a custom nginx.conf, uncomment the next line and make sure the file exists
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
