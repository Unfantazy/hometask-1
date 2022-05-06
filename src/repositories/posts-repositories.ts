import { postsCollection } from './db'

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
    async createPost(newPost: PostType) {
        await postsCollection.insertOne(newPost)
        return newPost
    }
}