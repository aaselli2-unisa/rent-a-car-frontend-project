# Stage 1: build React app
FROM node:20-alpine AS build
WORKDIR /app

# Dipendenze in layer separato: rieseguito solo se package*.json cambia
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# CI=false: CRA tratta warning come errori in CI mode, li ignoriamo in build
RUN CI=false npm run build

# Stage 2: serve con nginx
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Patch tutti i pacchetti OS Alpine (riduce CVE OS-level)
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*

# Rimuovi config di default nginx
RUN rm -rf ./*

COPY --from=build /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Esegui come utente non-root
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]