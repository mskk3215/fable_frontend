FROM node:20-alpine  AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /frontend/

# COPY package.json package-lock* ./
COPY package.json ./

RUN npm i
RUN npm ci


FROM base AS builder
WORKDIR /frontend/

ENV NODE_ENV production
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .

RUN npm run build


FROM base AS runner
WORKDIR /frontend/

ENV NEXT_SHARP_PATH=/frontend/node_modules/sharp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN npm i sharp

COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/next.config.js ./next.config.js

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /frontend/.next/static ./.next/static

# ビルド時の環境変数設定
ARG NEXT_PUBLIC_GOOGLE_MAP_API
ENV NEXT_PUBLIC_GOOGLE_MAP_API=${NEXT_PUBLIC_GOOGLE_MAP_API}

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]

# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
