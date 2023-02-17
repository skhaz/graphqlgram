import { User, UserModel } from '../entities/User'
import { JWT_SECRET } from '../environment'
import { UserInput } from './types/user'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { Resolver, Arg, Query, Mutation } from 'type-graphql'

@Resolver((_of) => User)
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async singleUser(@Arg('id') id: string) {
    return await UserModel.findById({ _id: id })
  }

  @Query(() => [User])
  async allUsers() {
    return await UserModel.find()
  }

  @Mutation(() => User)
  async createUser(@Arg('data') { name, email, password, image }: UserInput): Promise<User> {
    {
      const user = await UserModel.findOne({ email })

      if (user) {
        throw new Error('User already exist!')
      }
    }

    {
      const hash = await argon2.hash(password.toString())

      const user = (
        await UserModel.create({
          name,
          email,
          password: hash,
          image,
        })
      ).save()

      return user
    }
  }

  @Mutation(() => String)
  async logIn(
    @Arg('email')
    email: string,

    @Arg('password')
    password: string
  ): Promise<string> {
    const user = await UserModel.findByEmail(email as string)

    if (!user) {
      throw new Error('User not found!')
    }

    const result = await argon2.verify((user as User).password as string, password as string)

    if (!result) {
      throw new Error('Wrong password.')
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET)

    return token
  }
}
