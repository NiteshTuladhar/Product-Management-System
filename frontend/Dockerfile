# Development Stage
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]

# Builder Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Production Stage 
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]