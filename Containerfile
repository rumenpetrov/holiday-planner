FROM node:24.18.0
WORKDIR /var/www/app
COPY package*.json ./
RUN npm install
COPY . .
ENV HOST=0.0.0.0
EXPOSE 4321
CMD ["npm", "start"]
