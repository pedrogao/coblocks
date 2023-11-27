FROM node:20-alpine AS base

RUN apk add g++ make py3-pip git

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

FROM build AS access

RUN cd app/access && pnpm run build

EXPOSE 1234

CMD ["pnpm", "run", "start:prod"]