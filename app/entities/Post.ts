import { ObjectId } from 'mongodb'
import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, getModelForClass } from '@typegoose/typegoose'

import { User } from './User'

export type Ref<T> = T | ObjectId

@ObjectType()
export class Post {
  [key: string]: any
  @Field(() => ID)
  public id: number

  @Field()
  @Property({ required: true })
  public image: String

  @Field()
  @Property({ required: true })
  public title: String

  @Field()
  @Property({ required: true })
  public description: String

  @Field()
  @Property({ required: true })
  public author: String
}

export const PostModel = getModelForClass(Post)
