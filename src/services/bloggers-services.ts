import { bloggersRepositories } from '../repositories/bloggers-repositories'

export const bloggersServices = {
    async getBloggers() {
        return bloggersRepositories.getBloggers()
    },
    async getBloggerById(id: number) {
        return bloggersRepositories.getBloggerById(id)
    },
    async deleteBlogger(id: number) {
        return bloggersRepositories.deleteBlogger(id)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string) {
        return bloggersRepositories.updateBlogger(id, name, youtubeUrl)
    },
    async createBlogger(name: string, youtubeUrl: string) {
        const newBlogger: BloggerType = {
            id: +(new Date()),
            name,
            youtubeUrl
        }
        await bloggersRepositories.createBlogger(newBlogger)
        return newBlogger
    }
}