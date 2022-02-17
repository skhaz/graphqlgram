if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined.')
}

export const JWT_SECRET = process.env.JWT_SECRET

if (!process.env.MONGO_DSN) {
  throw new Error('MONGO_DSN environment variable is not defined.')
}

export const MONGO_DSN = process.env.MONGO_DSN
