import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { connect } from 'mongoose'
import jwt from 'jsonwebtoken'

import { JWT_SECRET, MONGO_DSN } from './constants'
import { authChecker } from './auth'
import { Context, JwtDecoded } from './types'
import { UserResolver } from './resolvers/User'
import { PostResolver } from './resolvers/Post'
import { User, UserModel } from './entities/User'

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver],
    emitSchemaFile: true,
    validate: false,
    authChecker,
  })

  const mongoose = await connect(MONGO_DSN)

  await mongoose.connection

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization || ''

        const decoded = jwt.verify(token, JWT_SECRET)

        const { id } = decoded as JwtDecoded

        const user = await UserModel.findById(id)

        const context: Context = { user: user as User }

        return context
      } catch {
        return {}
      }
    },
  })

  const app = express()

  await server.start()

  server.applyMiddleware({ app })

  app.listen({ port: 3000 })
}

main().catch((error) => {
  console.error(error)
})
