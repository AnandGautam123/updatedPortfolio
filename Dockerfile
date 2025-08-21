# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install deps using a clean, reproducible cache layer
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy the rest of the source
COPY . .

# Build production assets
# CRA respects BROWSERLIST and NODE_ENV
ENV NODE_ENV=production
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:1.27-alpine

# Remove default config and add our own (optional but recommended)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
