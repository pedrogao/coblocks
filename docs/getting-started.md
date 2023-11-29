# Getting Started

## Prerequisites

coblocks 是一个可伸缩的微服务集群，主要包括两个部分：

管理端：dashboard管理平台，用于管理协同块等业务：

![Alt text](image-8.png)

客户端：通过 coblocks 的API接口，实现业务的调用：

```tsx
import { createHocuspocusProvider } from "@hocuspocus/react";

const url = "ws://localhost:1234";
const name = "test-room-1";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdG9ySWQiOiIxIiwicHJvamVjdElkIjoiMSIsImlhdCI6MTcwMTIzOTM3OCwiZXhwIjoxNzAxMzI1Nzc4fQ.mhbnSjZnl-5rir4a9IZVUeI_1hXcn60_2w311qP5uyA`;

const { HocuspocusContextProvider, useHocuspocusProvider } = createHocuspocusProvider({
  url,
  name,
  token,
});

export { HocuspocusContextProvider, useHocuspocusProvider };
```

## Installation

生成 prisma 数据库客户端：

```bash
$ pnpm i
$ echo 'DATABASE_URL="mysql://root:123456@localhost:3306/coblocks"' > ./app/core/.env
$ pnpm --prefix ./app/core prisma generate
```

运行本地依赖：

```bash
$ docker-compose -f ./docker-compose-dev.yaml up
```

## Usage

运行服务：

```bash
$ pnpm app:start

$ pnpm dashboard
```

运行客户端样例：

```bash
$ pnpm playground
```

打开浏览器访问：http://localhost:5173 或者 http://localhost:5174
