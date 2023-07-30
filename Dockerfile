# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm install --production

# Copy the rest of the application files to the working directory
COPY server/ .

# Copy the .env file to the working directory in the container
COPY .env ./

# Expose the port that your Node.js application listens on
EXPOSE 3001

# Set the command to run your Node.js application
CMD ["node", "-r", "esm", "app.js"]
