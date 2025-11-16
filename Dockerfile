FROM node:20 AS build

ARG DATABASE_URL="postgresql://storeflow:storeflow@db:5432/storeflow?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src
COPY storeflow.txt ./storeflow.txt

RUN npx prisma generate
RUN npm run build

FROM node:20-slim AS production

ARG DATABASE_URL="postgresql://storeflow:storeflow@db:5432/storeflow?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate
COPY --from=build /app/dist ./dist
COPY storeflow.txt ./storeflow.txt

EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
