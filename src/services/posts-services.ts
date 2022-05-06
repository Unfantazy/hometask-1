import { PostsRepositories } from '../repositories/posts-repositories'
import { bloggersServices } from './bloggers-services'

export const PostsServices = {
    async getPosts() {
        return await PostsRepositories.getPosts()
    },
    async getPostById(id: number) {
        return await PostsRepositories.getPostById(id)
    },
    async deletePost(id: number) {
        return await PostsRepositories.deletePost(id)
    },
    async updatePost(model: PostType) {
        return await PostsRepositories.updatePost(model)
    },
    async createPost(model: PostType) {
        const { title, content, shortDescription, bloggerId } = model
        
        const blogger = await bloggersServices.getBloggerById(bloggerId)

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
        return PostsRepositories.createPost(newPost)
    }
}