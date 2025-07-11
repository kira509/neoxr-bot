# Use Node.js version 20
FROM node:20

# Install dependencies like ffmpeg (used for media)
RUN apt-get update && apt-get install -y ffmpeg curl && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN yarn install || npm install

# Copy the rest of the project files
COPY . .

# Expose port (optional)
EXPOSE 3000

# Start the bot
CMD ["node", "index.js"]


