import { z } from 'zod'

const schema = z.object({
  PORT: z.coerce.number().positive().default(3000),
  JWT_SECRET: z.string().min(6).max(256),
  MONGO_DSN: z.string().url(),
})

export const { PORT, JWT_SECRET, MONGO_DSN } = schema.parse(process.env)
