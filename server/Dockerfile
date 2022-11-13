FROM node

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

COPY tsconfig.json ./

COPY .env ./

COPY . .

ARG EnvironmentVariable

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "dev"]