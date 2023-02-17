import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ObjectType, Field, ID } from 'type-graphql'

export type Ref<T> = T | ObjectId

@ObjectType()
export class Post {
  [key: string]: unknown
  @Field(() => ID)
  public id: number

  @Field()
  @Property({ required: true })
  public image: string

  @Field()
  @Property({ required: true })
  public title: string

  @Field()
  @Property({ required: true })
  public description: string

  @Field()
  @Property({ required: true })
  public author: string
}

export const PostModel = getModelForClass(Post)
