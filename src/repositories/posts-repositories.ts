import { posts } from './db'
import { bloggersRepositories } from './bloggers-repositories'


export const PostsRepositories = {
    getPosts() {
        return posts
    },
    getPostById(id: number) {
        return posts.find(post => post.id === id) ?? null
    },
    deletePost(id: number) {
        const newPosts = posts.filter(post => post.id !== id)

        if (newPosts.length < posts.length) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            posts = newPosts
            return true
        }
        return false
    },
    updatePost(model: PostType) {
        const { title, id, content, shortDescription, bloggerId } = model

        const blogger = bloggersRepositories.getBloggerById(bloggerId)

        if (!blogger) {
            return false
        }

        const post = posts.find(post => post.id === id)
        if (!post) return false

        post.title = title
        post.shortDescription = shortDescription
        post.content = content

        return true
    },
    createPost(model: PostType) {
        const { title, content, shortDescription, bloggerId } = model
        
        const blogger = bloggersRepositories.getBloggerById(bloggerId)

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
        posts.push(newPost)
        return newPost

    }
}