import { prop as Property, getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  [key: string]: any
  @Field(() => ID)
  public id: number

  @Field()
  @Property({ required: true })
  public name: String

  @Field()
  @Property({ required: true })
  public email: String

  @Field()
  @Property({ required: true })
  public password: String

  @Field()
  @Property({ required: true })
  public image: String

  public static async findByEmail(this: ReturnModelType<typeof User>, email: string) {
    return this.findOne({ email }).exec()
  }
}

export const UserModel = getModelForClass(User)
