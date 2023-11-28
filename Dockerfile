# @see https://juejin.cn/post/7000222685816946696
# @see https://pnpm.io/docker

FROM node:20-alpine AS base

# RUN apk add g++ make py3-pip git

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Build packages
FROM base AS build

WORKDIR usr/app

# Copy all useful files
ADD . ./

RUN pnpm config set registry https://registry.npm.taobao.org
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run build:packages
# RUN pnpm run app:proto
RUN pnpm run app:prebuild
RUN pnpm run app:build

# Build access
RUN pnpm --prefix ./app/access run build 
# Build admin
RUN pnpm --prefix ./app/admin run build 
# Build core
RUN pnpm --prefix ./app/core run build 
# Build dashboard
RUN pnpm --prefix ./app/dashboard run build 

# deploy
RUN pnpm deploy --filter=./app/core --prod /prod/core
RUN cp -R ./app/proto/pb /prod/core/dist/proto
RUN ls -al /prod/core/dist/proto

RUN pnpm deploy --filter=./app/admin --prod /prod/admin
RUN cp -R ./app/proto/pb /prod/admin/dist/proto

RUN pnpm deploy --filter=./app/access --prod /prod/access
RUN cp -R ./app/proto/pb /prod/access/dist/proto

RUN pnpm deploy --filter=./app/dashboard --prod /prod/dashboard

# targets
# core
FROM node:20-alpine as core
COPY --from=build /prod/core /prod/core
RUN apk add openssl
WORKDIR /prod/core
EXPOSE 5000
CMD ["node", "dist/main.js"]

# access
FROM node:20-alpine as access
COPY --from=build /prod/access /prod/access
WORKDIR /prod/access
EXPOSE 1234
CMD ["node", "dist/main.js"]

# admin
FROM node:20-alpine as admin
COPY --from=build /prod/admin /prod/admin
WORKDIR /prod/admin
EXPOSE 3000
CMD ["node", "dist/main.js"]

# dashboard
FROM caddy:latest as dashboard
COPY --from=build /usr/app/app/dashboard/dist /var/www/html
EXPOSE 5173
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]