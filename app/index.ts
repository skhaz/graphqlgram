import { authChecker } from './auth'
import { JWT_SECRET, MONGO_DSN, PORT } from './constants'
import { UserModel } from './entities/User'
import { PostResolver } from './resolvers/Post'
import { UserResolver } from './resolvers/User'
import { Context, JwtDecoded } from './types'
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
        return {}
      }
    },
  })

  console.log(`🚀  Server ready at ${url}`)
}

bootstrap().catch((error) => {
  console.error(error)
})
