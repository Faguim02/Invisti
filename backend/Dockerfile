FROM node:20-alpine

WORKDIR /app
RUN apk add --no-cache openssl
COPY . .

RUN rm -rf node_modules
RUN npm i
CMD [ "npm", "run", "dev" ]

EXPOSE 8080