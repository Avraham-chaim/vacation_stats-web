# Install Linux Alpain OS + Node.js:
FROM node:20-alpine3.19

# Create /app folder:
WORKDIR /app 

# Copy only package.json so we could instll requirements as soon as posible:
COPY package.json /app

#Install package.json:
RUN npm i

# Copy entire project into /app:
COPY . /app

# Run project:
ENTRYPOINT npm start

