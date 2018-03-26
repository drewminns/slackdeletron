FROM node:9
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run asset-build && npm start
EXPOSE 8081