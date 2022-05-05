import { Request, Response, Router } from 'express'
import { PostsRepositories } from '../repositories/posts-repositories'
import { inputValidatorMiddleware } from '../middlewares/input-validator-middleware'
import { body } from 'express-validator'
import { bloggersRepositories } from '../repositories/bloggers-repositories'

export const postsRouter = Router({})

postsRouter
//Получение всех постов
    .get('/', (req: Request, res: Response) => {
        res.send(PostsRepositories.getPosts())
    })
//Добавление нового поста
    .post('/',
        body('title').trim().isLength({ min: 1, max: 30 }),
        body('shortDescription').trim().isLength({ min: 1, max: 100 }),
        body('content').trim().isLength({ min: 1, max: 1000 }),
        body('bloggerId').isLength({ min: 1 }).isNumeric(),
        inputValidatorMiddleware,

        (req: Request, res: Response) => {
            const { title, shortDescription, content, bloggerId } = req.body

            const newPost = PostsRepositories.createPost({
                title,
                shortDescription,
                content,
                bloggerId,
            })
        
            if (!newPost) {
                res.status(400).send({ errorsMessages: [{ message: 'no blogger', field: 'bloggerId' }], resultCode: 1 })
            }

            res.status(201).send(newPost)
        })
//Найти пост по ID
    .get('/:postId', (req: Request, res: Response) => {
        const id = +req.params.postId

        const post = PostsRepositories.getPostById(id)

        if (!post) {
            res.send(404)
            return
        }

        res.status(200).send(post)
    })
//Изменить информацию в посте
    .put('/:postId',

        body('title').trim().isLength({ min: 1, max: 30 }),
        body('shortDescription').trim().isLength({ min: 1, max: 100 }),
        body('content').trim().isLength({ min: 1, max: 1000 }),
        body('bloggerId').isLength({ min: 1 }).isNumeric(),
        inputValidatorMiddleware,
        
        (req: Request, res: Response) => {
            const id = +req.params.postId
            const { title, shortDescription, content, bloggerId } = req.body

            const blogger = bloggersRepositories.getBloggerById(bloggerId)

            if (!blogger) {
                res.status(400).send({ errorsMessages: [{ message: 'no blogger', field: 'bloggerId' }], resultCode: 1 })
            }

            const isUpdated = PostsRepositories.updatePost({
                id,
                title,
                shortDescription,
                content,
                bloggerId
            })

            if (!isUpdated) {
                res.status(400).send({ errorsMessages: [{ message: 'no blogger', field: 'bloggerId' }], resultCode: 1 })
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
