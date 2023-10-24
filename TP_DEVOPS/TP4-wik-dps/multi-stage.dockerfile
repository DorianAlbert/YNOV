# docker build -t wik-dps-tp02-ts-multi -f multi-stage.dockerfile .
FROM node:19-bullseye AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npx tsc

FROM node:19-bullseye-slim
WORKDIR /app

RUN adduser --no-create-home --disabled-login --group --system www
RUN chown www -R /app
USER www

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

CMD node build/index.js