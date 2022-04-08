import { posts } from "./db";


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
            // @ts-ignore
            posts = newPosts
            return true
        }
        return false
    },
    updatePost(model: PostType) {
        const { title, id, content, shortDescription } = model

        let post = posts.find(post => post.id === id)
        if (!post) return false

        post.title = title
        post.shortDescription = shortDescription
        post.content = content

        return true
    },
    createPost(model: PostType) {
        const { title, content, shortDescription, bloggerId } = model

        const newPost: PostType = {
            id: +(new Date()),
            bloggerId,
            content,
            shortDescription,
            title,
        }
        posts.push(newPost)
        return newPost

    }
}