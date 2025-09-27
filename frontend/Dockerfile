FROM node:lts-alpine AS builder
ENV NODE_ENV development

WORKDIR /frontend

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY eslint.config.js .
COPY .env .
COPY index.html .

RUN yarn install --network-timeout 1000000000

FROM builder AS development

EXPOSE $PORT
CMD ["yarn", "dev"]

FROM builder AS production

COPY . .

EXPOSE $PORT

CMD ["yarn", "build"]
