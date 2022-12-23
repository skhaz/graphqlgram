FROM node:18 AS base

FROM base AS build
WORKDIR /opt
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM base AS deps
WORKDIR /opt
COPY package*.json ./
RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs:18
WORKDIR /app
COPY --from=build /opt/dist .
COPY --from=deps /opt/node_modules node_modules

EXPOSE 3000

CMD ["index.js"]