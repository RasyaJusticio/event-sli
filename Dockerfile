##### DEPENDENCIES

FROM --platform=linux/amd64 node:22-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy prisma schema so prisma generate runs during install
COPY prisma ./

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### BUILDER

FROM --platform=linux/amd64 node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# SKIP_ENV_VALIDATION=1 because DATABASE_URL and ADMIN_SECRET are runtime secrets —
# not available at build time. T3 docs explicitly require this for Docker builds.
RUN \
    if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
    elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm approve-builds && SKIP_ENV_VALIDATION=1 pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

##### RUNNER

# Distroless — no shell, no package manager, just Node. Smaller + more secure.
# https://create.t3.gg/en/deployment/docker
FROM --platform=linux/amd64 gcr.io/distroless/nodejs22-debian12 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Standalone output only — no dev deps, much smaller image
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# No shell in distroless — CMD must be the node binary directly
CMD ["server.js"]