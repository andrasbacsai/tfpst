# TRPC + Fastify + Prisma + SvelteKit + TailwindCSS

## Get Started

- Copy src/server/.env-template to src/server/.env
- pnpm install
- pnpm db:push -> Push Prisma schema to local SQLite and generate types
- pnpm dev
- Open localhost:5173

You will see queries going through /trpc, /api and data queried from database. 🪄
