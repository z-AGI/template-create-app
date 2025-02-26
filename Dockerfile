FROM node:18-alpine

USER root

RUN apk update && apk upgrade
RUN apk add --no-cache curl npm

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com
RUN echo `npm config get registry`

RUN npm install yarn 

COPY . .
# RUN yarn add --dev typescript tsx
RUN npm install tsx@4.19.3 --save-dev
RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]