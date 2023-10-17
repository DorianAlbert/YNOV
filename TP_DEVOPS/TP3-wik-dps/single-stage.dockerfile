# docker build -t wik-dps-tp02-ts-single -f single-stage.dockerfile .
FROM node:19-bullseye
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npx tsc

RUN adduser --no-create-home --group --disabled-login --system www
RUN chown www -R /app
USER www

CMD node build/index.js