FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Create logs directory
RUN mkdir -p logs && chmod 755 logs

EXPOSE 5000

CMD ["npm", "run", "dev"]