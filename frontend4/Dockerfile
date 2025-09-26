FROM node:lts-alpine AS builder
ENV NODE_ENV development

WORKDIR /frontend4

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.node.json .
COPY tsconfig.vitest.json .
COPY vite.config.ts .
COPY vitest.config.ts .
COPY eslint.config.ts .

RUN yarn install --network-timeout 1000000000

FROM builder AS development

COPY . .

EXPOSE 3004
CMD ["yarn", "dev"]

FROM builder AS production

COPY . .

EXPOSE $PORT

CMD ["yarn", "build"]
