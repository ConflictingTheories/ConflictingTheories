FROM node:latest

WORKDIR /app/storefront

COPY . .

RUN rm -rf node_modules

RUN apt-get update

RUN npm install -g npm@latest

RUN npm install -g next

RUN npm install sharp

RUN npm install --loglevel=error

ENTRYPOINT ["yarn", "dev"]