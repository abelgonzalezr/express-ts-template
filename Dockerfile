FROM node:lts-alpine3.16


WORKDIR /app


COPY package*.json ./
COPY tsconfig.json ./
COPY tsoa.json ./
COPY authentication.ts ./
COPY src ./src


RUN yarn install


RUN yarn build

RUN ls

EXPOSE 3000


CMD [ "yarn", "start" ]
