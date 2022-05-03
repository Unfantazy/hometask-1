import { bloggers } from './db'

export const bloggersRepositories = {
    getBloggers() {
        return bloggers
    },
    getBloggerById(id: number) {
        return bloggers.find(blogger => blogger.id === id) ?? null
    },
    deleteVideo(id: number) {
        const newBloggers = bloggers.filter(blogger => blogger.id !== id)
        if (newBloggers.length < bloggers.length) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            bloggers = newBloggers
            return true
        }
        return false
    },
    updateVideo(id: number, name: string, youtubeUrl: string) {
        const blogger = bloggers.find(blogger => blogger.id === id)
        if (!blogger) return false

        blogger.name = name
        blogger.youtubeUrl = youtubeUrl

        return true
    },
    createBlogger(name: string, youtubeUrl: string) {
        const newBlogger: BloggerType = {
            id: +(new Date()),
            name,
            youtubeUrl
        }

        bloggers.push(newBlogger)
        return newBlogger
    }
}