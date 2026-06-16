# Note: I've used AI heavily for this file and docker-compose.yml due to their complicated nature

# ================================
# Stage 1: Build
# ================================
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# ================================
# Stage 2: Production
# ================================
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only what we need from the build stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "src/server.js"]