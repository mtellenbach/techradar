FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
COPY ./bin /app/backend/bin

EXPOSE 3000

CMD ["npm", "start"]