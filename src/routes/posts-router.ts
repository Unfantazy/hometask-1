import { Request, Response, Router } from 'express'
import { PostsRepositories } from '../repositories/posts-repositories'
import { inputValidatorMiddleware } from '../middlewares/input-validator-middleware'
import { body } from 'express-validator'
import { bloggersRepositories } from '../repositories/bloggers-repositories'
import { authMiddleware } from '../middlewares/auth-middleware'

export const postsRouter = Router({})

postsRouter
//Получение всех постов
    .get('/', async (req: Request, res: Response) => {
        res.send(await PostsRepositories.getPosts())
    })
//Добавление нового поста
    .post('/',
        authMiddleware,
        body('title').trim().isLength({ min: 1, max: 30 }),
        body('shortDescription').trim().isLength({ min: 1, max: 100 }),
        body('content').trim().isLength({ min: 1, max: 1000 }),
        body('bloggerId').isLength({ min: 1 }).isNumeric(),
        inputValidatorMiddleware,

        async (req: Request, res: Response) => {
            const { title, shortDescription, content, bloggerId } = req.body

            const newPost = await PostsRepositories.createPost({
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
    .get('/:postId', async (req: Request, res: Response) => {
        const id = +req.params.postId

        const post = await PostsRepositories.getPostById(id)

        if (!post) {
            res.send(404)
            return
        }

        res.status(200).send(post)
    })
//Изменить информацию в посте
    .put('/:postId',

        authMiddleware,
        body('title').trim().isLength({ min: 1, max: 30 }),
        body('shortDescription').trim().isLength({ min: 1, max: 100 }),
        body('content').trim().isLength({ min: 1, max: 1000 }),
        body('bloggerId').isLength({ min: 1 }).isNumeric(),
        inputValidatorMiddleware,
        
        async (req: Request, res: Response) => {
            const id = +req.params.postId
            const { title, shortDescription, content, bloggerId } = req.body

            const blogger = await bloggersRepositories.getBloggerById(bloggerId)

            if (!blogger || !bloggerId) {
                res.status(400).send({ errorsMessages: [{ message: 'no blogger', field: 'bloggerId' }], resultCode: 1 })
                return
            }

            const updatedPost = await PostsRepositories.updatePost({
                id,
                title,
                shortDescription,
                content,
                bloggerId
            })

            if (!updatedPost) {
                res.send(404)
                return
            }

            res.send(204)
        })
//Удаление блоггера
    .delete('/:postId',
        authMiddleware,
        async (req: Request, res: Response) => {
            const id = +req.params.postId

            if (!id) {
                res.send(400)
            }

            const isDeleted = await PostsRepositories.deletePost(id)

            if (!isDeleted) {
                res.send(404)
            }

            res.send(204)
        })
