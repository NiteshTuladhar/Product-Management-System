FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY  package*.json ./

RUN npm ci --legacy-peer-deps

COPY  . .

USER node

FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY  package*.json ./

COPY  --from=development /usr/src/app/node_modules ./node_modules

COPY  . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

USER node




FROM node:16-alpine As production


COPY  --from=build /usr/src/app/node_modules ./node_modules
COPY  --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/package-lock.json ./package-lock.json

CMD ["node", "dist/main.js"]
