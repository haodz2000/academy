FROM node:16.19.0-alpine as builder

RUN mkdir /app

WORKDIR /app

COPY . .

ENV CYPRESS_INSTALL_BINARY=0
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm install --frozen-lockfile

RUN npx nx run server:build:production --skip-nx-cache

FROM node:16.19.0-alpine

COPY ./docker/server/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

WORKDIR /app
COPY --from=builder /app/dist/packages /app
COPY --from=builder /app/google_app_credentials.json /app
COPY --from=builder /app/package.json /app
COPY --from=builder /app/package-lock.json /app
RUN npm install --frozen-lockfile --prod

EXPOSE 3333
