import { Resolver, Arg, Query, Mutation, Authorized, Ctx } from 'type-graphql'

import { Post, PostModel } from '../entities/Post'
import { PostInput } from './types/post'
import { Context } from '../types'

@Resolver((_of) => Post)
export class PostResolver {
  @Authorized()
  @Query((_returns) => Post, { nullable: false })
  async singlePost(@Arg('id') id: string) {
    return await PostModel.findById({ _id: id })
  }

  @Authorized()
  @Query(() => [Post])
  async allPosts() {
    return await PostModel.find()
  }

  @Authorized()
  @Mutation(() => Post)
  async createPost(@Arg('data') { image, title, description }: PostInput, @Ctx() { user }: Context): Promise<Post> {
    const post = (
      await PostModel.create({
        image,
        title,
        description,
        author: user?.id,
      })
    ).save()

    return post
  }

  @Authorized()
  @Mutation(() => Post)
  async updatePost(@Arg('id') id: string, @Arg('data') { image, title, description }: PostInput, @Ctx() { user }: Context): Promise<Post> {
    const post = await PostModel.findOne({ _id: id, author: user?.id })

    if (!post) {
      throw new Error('Post not found!')
    }

    await post.updateOne({ image, title, description })

    return post
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: string, @Ctx() { user }: Context) {
    const post = await PostModel.findOne({ _id: id, author: user?.id })

    if (!post) {
      throw new Error('Post not found!')
    }

    await post.deleteOne()

    return true
  }
}
