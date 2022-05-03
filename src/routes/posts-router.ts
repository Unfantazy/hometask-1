import { Request, Response, Router } from 'express'
import { PostsRepositories } from '../repositories/posts-repositories'

export const postsRouter = Router({})

postsRouter
//Получение всех постов
    .get('/', (req: Request, res: Response) => {
        res.send(PostsRepositories.getPosts())
    })
//Добавление нового поста
    .post('/', (req: Request, res: Response) => {
        const { title, shortDescription, content, bloggerId } = req.body

        if (!bloggerId) {
            res.send(400)
            return
        }

        const newPost = PostsRepositories.createPost({
            title,
            shortDescription,
            content,
            bloggerId,
        })
        
        if (!newPost) {
            res.send(400)
            return
        }

        res.status(201).send(newPost)
    })
//Найти пост по ID
    .get('/:postId', (req: Request, res: Response) => {
        const id = +req.params.postId

        const post = PostsRepositories.getPostById(id)

        if (!id) {
            res.send(400)
            return
        }

        if (!post) {
            res.send(404)
            return
        }

        res.status(200).send(post)
    })
//Изменить информацию в посте
    .put('/:postId', (req: Request, res: Response) => {
        const id = +req.params.postId
        const { title, shortDescription, content, bloggerId } = req.body

        const isUpdated = PostsRepositories.updatePost({
            id,
            title,
            shortDescription,
            content,
            bloggerId
        })

        if (!id || !bloggerId) {
            res.send(400)
            return
        }

        if (!isUpdated) {
            res.send(404)
            return
        }

        res.send(204)
    })
//Удаление блоггера
    .delete('/:postId', (req: Request, res: Response) => {
        const id = +req.params.postId

        if (!id) {
            res.send(400)
        }

        const isDeleted = PostsRepositories.deletePost(id)

        if (!isDeleted) {
            res.send(404)
        }

        res.send(204)
    })
