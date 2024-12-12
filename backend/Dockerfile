FROM node:20-alpine

WORKDIR /app
COPY . .

RUN rm -rf node_modules
RUN npm i
CMD [ "npm", "run", "dev" ]

EXPOSE 8080