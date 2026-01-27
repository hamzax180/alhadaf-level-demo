FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run prisma:generate
EXPOSE 8080
CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm run dev"]
