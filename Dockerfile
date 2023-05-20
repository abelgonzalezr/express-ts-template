FROM node


WORKDIR /app


COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src


RUN yarn install


RUN yarn build


EXPOSE 3000


CMD [ "yarn", "start" ]
