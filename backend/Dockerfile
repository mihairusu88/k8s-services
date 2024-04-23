# Use official Node.js image as base
FROM node:lts-alpine as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code to working directory
COPY ./ .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]