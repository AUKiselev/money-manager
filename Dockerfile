FROM node:16.16.0-alpine

COPY . .

RUN npm install -g pnpm
RUN pnpm install

CMD [ "pnpm", "build" ]