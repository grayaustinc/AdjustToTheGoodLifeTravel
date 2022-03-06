# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ARG ARANGO_URL
ARG ARANGO_USERNAME
ARG ARANGO_PASSWORD
ARG ARANGO_DATABASE_NAME
ARG ARANGO_MAX_SOCKETS

ARG EMAIL_HOST
ARG EMAIL_PORT
ARG EMAIL_SECURE
ARG EMAIL_TO
ARG EMAIL_USERNAME
ARG EMAIL_PASSWORD

ARG S3_ENDPOINT
ARG S3_ACCESS_KEY_ID
ARG S3_SECRET_ACCESS_KEY

ARG SESSION_COOKIE_NAME
ARG SESSION_SECRET

ARG NEXT_PUBLIC_WEBSITE_DOMAIN
ARG NEXT_PUBLIC_STATIC_DOMAIN

ENV NODE_OPTIONS= --max_old_space_size=2048

RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start"]