import { postsCollection } from './db'
import { bloggersRepositories } from './bloggers-repositories'


export const PostsRepositories = {
    async getPosts() {
        return postsCollection.find({}).toArray()
    },
    async getPostById(id: number) {
        return await postsCollection.findOne({ id }) || null
    },
    async deletePost(id: number) {
        const result = await postsCollection.deleteOne({ id })
        return !!result.deletedCount
    },
    async updatePost(model: PostType) {
        const { title, id, content, shortDescription } = model
        return await postsCollection.updateOne({ id }, { $set: { title, content, shortDescription } })
    },
    async createPost(model: PostType) {
        const { title, content, shortDescription, bloggerId } = model
        
        const blogger = await bloggersRepositories.getBloggerById(bloggerId)

        if (!blogger) {
            return null
        }

        const newPost: PostType = {
            id: +(new Date()),
            bloggerId,
            content,
            shortDescription,
            title,
            bloggerName: blogger.name
        }
        await postsCollection.insertOne(newPost)
        return newPost

    }
}