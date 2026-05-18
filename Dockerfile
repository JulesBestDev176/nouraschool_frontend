# =============================================
# Stage 1 — Builder (Node.js + Angular CLI)
# =============================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Production build — uses environment.prod.ts automatically
RUN npm run build

# =============================================
# Stage 2 — Runner (Nginx static file server)
# =============================================
FROM nginx:1.27-alpine AS runner

# Angular 17 "application" builder outputs to dist/<name>/browser/
COPY --from=builder /app/dist/noura_school_frontend/browser /usr/share/nginx/html

# SPA routing + gzip + security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
