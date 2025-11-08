# Server

Make sure you have environment variables `DATABASE_URL` and `JWT_SECRET` set in a `.env` file in the `server` directory.

To run:

```sh
cd server
pnpm i
pnpm prisma generate
pnpm prisma migrate deploy
pnpm prisma:seed
pnpm start
```
