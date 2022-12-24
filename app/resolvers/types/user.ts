import { Length, IsEmail } from 'class-validator'
import { InputType, Field, ID } from 'type-graphql'
import { User } from '~/entities/User'

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  name: String

  @Field()
  @IsEmail()
  email: String

  @Field()
  @Length(1, 255)
  password: String

  @Field()
  image: String
}
