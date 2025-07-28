FROM node:latest

WORKDIR /frontend

COPY ./package*.json .

RUN npm install

#コンテナ起動時に実行するコマンド
CMD ["npm", "run", "dev"]