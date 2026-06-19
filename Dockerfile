##### DEPENDENCIES

FROM --platform=linux/amd64 node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Required for pnpm
RUN corepack enable

# Copy dependency manifests first for better layer caching
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Prisma schema is needed because prisma generate runs during install
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile

##### BUILDER

FROM --platform=linux/amd64 node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=deps /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY . .

# DATABASE_URL and other secrets are runtime-only
RUN SKIP_ENV_VALIDATION=1 pnpm run build

##### MIGRATE

FROM deps AS migrate

COPY . .

CMD ["pnpm", "prisma", "migrate", "deploy"]

##### RUNNER

FROM --platform=linux/amd64 gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]