# Step 1: Build the ReactJS app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install -f

# Copy the rest of the ReactJS source code
COPY . ./

# Build the React app
RUN npm run build

# Step 2: Set up a Node.js server to serve the React app
FROM node:16 AS production

# Set the working directory inside the container
WORKDIR /app

# Install serve (or you can use another Node.js server)
RUN npm install -g serve

# Copy the build artifacts from the build stage
COPY --from=build /app/build /app/build

# Expose the port the app will run on
EXPOSE 3000

# Serve the app with `serve`
CMD ["serve", "-s", "build", "-l", "3000"]