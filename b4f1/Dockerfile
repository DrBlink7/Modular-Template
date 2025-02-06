FROM node:lts-alpine AS development
ENV NODE_ENV development

WORKDIR /b4f1

COPY package.json .
COPY yarn.lock .
COPY .env .
COPY tsconfig.build.json .
COPY tsconfig.json .

RUN yarn global add @nestjs/cli
RUN yarn install --network-timeout 1000000000

COPY . .

EXPOSE $PORT

CMD ["yarn", "start:dev"]
