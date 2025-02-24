FROM node:20.5-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Bundle app source
COPY . .

RUN cd client && npm install && npm run build

EXPOSE 3000

# Start your Node.js app
CMD [ "npm", "start" ]