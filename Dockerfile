FROM node:18-alpine3.16

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN npx prisma generate
RUN pnpm build

EXPOSE 3000
CMD ["node", "build"]
