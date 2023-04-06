FROM node:17.1.0

WORKDIR /app/medusa

COPY package.json .
COPY develop.sh .
COPY yarn.* .

RUN apt-get update
RUN apt-get install -y python

COPY . .
RUN yarn

ENTRYPOINT ["./develop.sh"]
