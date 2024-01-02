FROM node:lts-alpine AS development
ENV NODE_ENV development

WORKDIR /b4f

COPY package.json .
COPY yarn.lock .
COPY .env .
COPY jest.config.ts .
COPY swagger.json .
COPY tsconfig.json .
COPY nodemon.json .

RUN yarn install --network-timeout 1000000000

RUN yarn global add nodemon

COPY . .

EXPOSE $PORT

CMD ["yarn", "start:dev"]
