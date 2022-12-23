import { authChecker } from './auth'
import { JWT_SECRET, MONGO_DSN } from './constants'
import { User, UserModel } from './entities/User'
import { PostResolver } from './resolvers/Post'
import { UserResolver } from './resolvers/User'
import { Context, JwtDecoded } from './types'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'
import { startStandaloneServer } from '@apollo/server/standalone'
import jwt from 'jsonwebtoken'
import { connect } from 'mongoose'
import { buildSchema } from 'type-graphql'

const main = async () => {
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
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization || ''

        const { id } = jwt.verify(token, JWT_SECRET) as JwtDecoded

        const user = await UserModel.findById(id)

        return { user: user as User }
      } catch {
        return { user: null }
      }
    },
    listen: { port: 3000 },
  })

  console.log(`🚀  Server ready at ${url}`)
  /*
  const server = new ApolloServer<MyContext>({
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

  server.expressMiddleware({ app })

  app.listen({ port: 3000 })
  */
}

main().catch((error) => {
  console.error(error)
})
