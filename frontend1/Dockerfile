FROM node:lts-alpine AS builder
ENV NODE_ENV development

WORKDIR /frontend1

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY tsconfig.eslint.json .
COPY craco.config.ts .
COPY .eslintrc.json .
COPY .env .

RUN yarn install --network-timeout 1000000000

FROM builder AS development

EXPOSE $PORT
CMD ["yarn", "start"]

FROM builder AS production

COPY . .

EXPOSE $PORT

CMD ["yarn", "start"]
