# Step 1: Use the official Node.js image
FROM node:18

# Step 2: Create a working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files
COPY . .

# Step 6: Expose the port the application runs on
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "start"]