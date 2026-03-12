# Use Node.js 20 slim as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the project (if needed, but currently tsx is used)
# RUN npm run build

# Expose any necessary ports (bot doesn't strictly need one, but if healthcheck or dashboard added later)
# EXPOSE 3000

# Set environment variables (should be passed via docker-compose or .env)
# ENV NODE_ENV=production

# Start the bot
CMD ["npm", "run", "dev:bot"]
