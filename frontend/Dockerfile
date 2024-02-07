# Stage 1: Builder
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .

WORKDIR /app
RUN ng build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
