import { prop as Property, getModelForClass, ReturnModelType } from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  public id: number

  @Field()
  @Property({ required: true })
  public name: string

  @Field()
  @Property({ required: true })
  public email: string

  @Field()
  @Property({ required: true })
  public password: string

  @Field()
  @Property({ required: true })
  public image: string

  public static async findByEmail(this: ReturnModelType<typeof User>, email: string) {
    return this.findOne({ email }).exec()
  }
}

export const UserModel = getModelForClass(User)
