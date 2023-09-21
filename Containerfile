FROM node:18
WORKDIR /var/www/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN chown -R node:node /var/www/app
USER node
CMD ["npm", "start"]
