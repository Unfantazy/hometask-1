import { Request, Response, Router } from 'express'
import { PostsRepositories } from '../repositories/posts-repositories'
import { inputValidatorMiddleware } from '../middlewares/input-validator-middleware'
import { body } from 'express-validator'

export const postsRouter = Router({})

postsRouter
//Получение всех постов
    .get('/', (req: Request, res: Response) => {
        res.send(PostsRepositories.getPosts())
    })
//Добавление нового поста
    .post('/',
        body('title').trim().isLength({ min: 1, max: 30 }).withMessage('The title field is required'),
        body('shortDescription').trim().isLength({ min: 1, max: 100 }).withMessage('The shortDescription field is required'),
        body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('The content field is required'),
        body('bloggerId').isLength({ min: 1 }).withMessage('The bloggerId is required').isNumeric(),
        inputValidatorMiddleware,

        (req: Request, res: Response) => {
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

        if (!post) {
            res.send(404)
            return
        }

        res.status(200).send(post)
    })
//Изменить информацию в посте
    .put('/:postId',
        body('title').trim().isLength({ min: 1, max: 30 }).withMessage('The title field is required'),
        body('shortDescription').trim().isLength({ min: 1, max: 100 }).withMessage('The shortDescription field is required'),
        body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('The content field is required'),
        body('bloggerId').isLength({ min: 1 }).withMessage('The bloggerId is required').isNumeric(),
        inputValidatorMiddleware,
        
        (req: Request, res: Response) => {
            const id = +req.params.postId
            const { title, shortDescription, content, bloggerId } = req.body

            const isUpdated = PostsRepositories.updatePost({
                id,
                title,
                shortDescription,
                content,
                bloggerId
            })

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
