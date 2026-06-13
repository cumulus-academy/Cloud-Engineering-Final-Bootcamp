# =============================================================================
# Frontend image — provided by the academy.
# Multi-stage: build the static site with Node, then serve it with nginx.
# You will build this and push it to ECR in Milestone 4.
# =============================================================================

# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# The API base URL is baked in at build time (Vite inlines VITE_* vars).
# Leave empty for production to use same-origin "/api" via your ALB Ingress.
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
