FROM node:lts-alpine AS builder
ENV NODE_ENV development

WORKDIR /frontend2

COPY package.json .
COPY yarn.lock .
COPY astro.config.mjs .
COPY tsconfig.json .
COPY tsconfig.eslint.json .
COPY .eslintrc.json .
COPY .env .

RUN yarn install --network-timeout 1000000000

FROM builder AS development

EXPOSE $PORT
CMD ["yarn", "dev"]

FROM builder AS production

COPY . .

EXPOSE $PORT

CMD ["yarn", "build"]
