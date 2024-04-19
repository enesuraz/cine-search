FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY frontend/package*.json frontend/
RUN npm run install-client

COPY backend/package*.json backend/
RUN npm run install-server

COPY backend/ backend/

COPY frontend/ frontend/
RUN npm run build-client

ARG port=8000

USER node

CMD [ "npm", "run", "prod", "--prefix", "backend" ]

EXPOSE ${port}