# coblocks

Cobratative blocks open source implementation.

## Setup

```sh
$ echo 'DATABASE_URL="mysql://root:123456@localhost:3306/coblocks"' > ./app/core/.env
$ pnpm --prefix ./app/core prisma generate

$ docker-compose up -d
```
