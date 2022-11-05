FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV production

CMD ["node", "dist/main.js"]