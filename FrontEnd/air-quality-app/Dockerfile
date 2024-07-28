# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Step 2: Server with Nginx
# Use an official Nginx runtime as a parent image
FROM nginx:1.23-alpine

# Set the working directory to the Nginx HTML directory
WORKDIR /usr/share/nginx/html

# Remove the default Nginx static assets
RUN rm -rf ./*

# Copy the built React app from the build stage to the Nginx HTML directory
COPY --from=build /app/dist .  

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure the correct path to the build directory

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
