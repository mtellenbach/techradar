FROM node:18.17.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/frontend/browser/ /usr/share/nginx/html
EXPOSE 80
