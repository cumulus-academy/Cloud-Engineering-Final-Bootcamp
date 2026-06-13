# =============================================================================
# Backend image — provided by the academy.
# You will build this and push it to ECR in Milestone 4.
# =============================================================================
FROM node:20-alpine

# Run as the built-in non-root user for safety.
WORKDIR /app

# Install production dependencies first (better layer caching).
COPY package.json ./
RUN npm install --omit=dev

# Copy application source.
COPY src ./src

ENV NODE_ENV=production
ENV BACKEND_PORT=4000
EXPOSE 4000

USER node

# Container-level healthcheck hitting the liveness endpoint.
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.BACKEND_PORT||4000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/server.js"]
