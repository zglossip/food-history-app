# Base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

EXPOSE 8081

# Start the application
CMD ["npm", "run", "dev:container"]
