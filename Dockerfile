# Use an official Node.js runtime as the base image
FROM node:16

# Create and set the working directory in the container
WORKDIR /backend/src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

RUN npm run build

# Expose the port that the Nest.js application will run on
EXPOSE 3000

# Define the command to start your Nest.js application
CMD ["npm", "run", "start"]
