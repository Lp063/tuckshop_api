FROM node:14.16.0-alpine
WORKDIR /usr/src/app/tuckshop_api
COPY package*.json ./
ENV DB_MYSQL_HOST localhost
ENV DB_MYSQL_USER tuckshop
ENV DB_MYSQL_PASSWORD tuckshop
ENV DB_MYSQL_DATABASE tuckshop
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npx","nodemon","-L","index.js"]