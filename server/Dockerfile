FROM node

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

#COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

RUN npx prisma migrate deploy

EXPOSE 3333

CMD ["npm", "run", "start"]
