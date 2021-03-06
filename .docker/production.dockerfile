FROM node:latest

COPY package.json /var/www/id8-server
RUN npm install

COPY . /var/www/id8-server
WORKDIR /var/www/id8-server

RUN npm install -g pm2@latest
RUN mkdir -p /var/log/pm2

EXPOSE 3001

ENTRYPOINT ["pm2-docker", "process.yml", "--log", "/var/log/pm2/pm2.log"]
