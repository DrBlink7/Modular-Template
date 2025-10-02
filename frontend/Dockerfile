FROM node:lts-alpine3.22

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --network-timeout 1000000000

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"] 