import { bloggersCollection } from './db'

export const bloggersRepositories = {
    async getBloggers() {
        return bloggersCollection.find({}).toArray()
    },
    async getBloggerById(id: number) {
        return await bloggersCollection.findOne({ id }) || null
    },
    async deleteBlogger(id: number) {
        const result = await bloggersCollection.deleteOne({ id })
        return !!result.deletedCount
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string) {
        const result = await bloggersCollection.updateOne({ id }, { $set: { name, youtubeUrl } })
        return !!result.matchedCount
    },
    async createBlogger(newBlogger: BloggerType) {
        await bloggersCollection.insertOne(newBlogger)
        return newBlogger
    }
}