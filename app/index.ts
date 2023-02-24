import { authChecker } from './auth'
import { UserModel } from './entities/User'
import { JWT_SECRET, MONGO_DSN, PORT } from './environment'
import { PostResolver } from './resolvers/Post'
import { UserResolver } from './resolvers/User'
import type { Context, JwtDecoded } from './types'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { startStandaloneServer } from '@apollo/server/standalone'
import jwt from 'jsonwebtoken'
import { connect } from 'mongoose'
import { buildSchema } from 'type-graphql'

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver],
    emitSchemaFile: true,
    validate: false,
    authChecker,
  })

  const mongoose = await connect(MONGO_DSN)

  await mongoose.connection

  const server = new ApolloServer<Context>({ schema, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] })

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization || ''

        const { id } = jwt.verify(token, JWT_SECRET) as JwtDecoded

        return { user: await UserModel.findById(id) }
      } catch {
        return { user: undefined }
      }
    },
  })

  console.log(`🚀  Server ready at ${url}`)
}

process.on('SIGINT', () => process.exit(0));
process.on('SIGQUIT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

bootstrap().catch((error) => {
  console.error(error)
})
