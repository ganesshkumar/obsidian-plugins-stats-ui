# Multi-stage build for minimal Next.js Docker image

# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache libc6-compat openssl

# Enable Corepack for Yarn
RUN corepack enable

# Accept build arguments for environment variables
ARG DATABASE_URL

# Set environment variables from build args
ENV DATABASE_URL=$DATABASE_URL

# Copy package files and prisma schema first (for layer caching)
COPY package.json yarn.lock ./
COPY prisma ./prisma

# Install all dependencies for build
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN yarn prisma generate

# Copy source files (node_modules excluded via .dockerignore)
COPY . .

# Build the application with standalone output
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn build

# Stage 2: Runner (Minimal production image)
FROM node:20-alpine AS runner
WORKDIR /app

# Install OpenSSL for Prisma (minimal)
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone output (includes minimal node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
