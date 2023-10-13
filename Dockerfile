FROM oven/bun:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY bun.lockb ./
RUN bun i

# Copy app code
COPY ./src ./src/ ./static ./static/

# Start the app
CMD ["bun", "start"]