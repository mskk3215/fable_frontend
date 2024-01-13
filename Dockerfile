FROM node:20-alpine

WORKDIR /frontend/

COPY package.json package-lock* ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY server.js .

CMD ["npm", "run","dev"]
