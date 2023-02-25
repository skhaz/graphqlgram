import { User } from '../../entities/User'
import { Length, IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  @Length(1, 255)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(1, 255)
  password: string

  @Field()
  image: string
}
