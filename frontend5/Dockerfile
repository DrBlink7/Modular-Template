FROM node:18.13-alpine AS builder

WORKDIR /frontend5
COPY package.json ./
RUN npm install

COPY . ./

FROM builder AS development

EXPOSE $PORT
CMD ["npm", "run", "start-dev"]
