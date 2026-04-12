import 'dotenv/config'
import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    url: 'postgres://f3460d9686bf8dd0054214f77051fb3677a3ed53f5e15cdb9d95c81f12d2ef50:sk_ieK0IdXMT5A2e-AKDdj8b@db.prisma.io:5432/postgres?sslmode=require',
  },
})