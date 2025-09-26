FROM node:lts-alpine AS builder
ENV NODE_ENV development

WORKDIR /frontend3

COPY package.json .
COPY yarn.lock .
COPY .eslintrc.json .
COPY eslint.config.mjs .
COPY next-env.d.ts .
COPY next.config.ts .
COPY tsconfig.json .
COPY tsconfig.eslint.json .
COPY tailwind.config.ts .
COPY postcss.config.mjs .
COPY .env .

RUN yarn install --network-timeout 1000000000

FROM builder AS development

EXPOSE $PORT
CMD ["yarn", "dev"]

FROM builder AS production

COPY . .

EXPOSE $PORT

CMD ["yarn", "build"]
