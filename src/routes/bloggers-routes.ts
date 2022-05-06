import { Request, Response, Router } from 'express'
import { bloggersRepositories } from '../repositories/bloggers-repositories'
import { body } from 'express-validator'
import { inputValidatorMiddleware } from '../middlewares/input-validator-middleware'
import { authMiddleware } from '../middlewares/auth-middleware'

export const bloggersRouter = Router({})


bloggersRouter
//Получение всех блоггеров
    .get('/', async (req: Request, res: Response) => {
        res.send(await bloggersRepositories.getBloggers())
    })
//Добавление нового блоггера
    .post('/',
        authMiddleware,
        body('name').trim().isLength({ min: 1, max: 15 }),
        body('youtubeUrl').trim().isLength({ min: 1, max: 100 }).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/),
        inputValidatorMiddleware,

        async (req: Request, res: Response) => {
            const { name, youtubeUrl } = req.body

            const blogger = await bloggersRepositories.createBlogger(name, youtubeUrl)

            res.status(201).send(blogger)
        })
//Найти блоггера по ID
    .get('/:bloggerId', async (req: Request, res: Response) => {
        const id = +req.params.bloggerId

        const blogger = await bloggersRepositories.getBloggerById(id)

        if (!id) {
            res.send(400)
            return
        }

        if (!blogger) {
            res.send(404)
            return
        }

        res.send(blogger)
    })
//Изменить информацию о блоггере
    .put('/:bloggerId',

        authMiddleware,
        body('name').trim().isLength({ min: 1, max: 15 }),
        body('youtubeUrl').trim().isLength({ min: 1, max: 100 }).matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/),
        inputValidatorMiddleware,

        async (req: Request, res: Response) => {
            const id = +req.params.bloggerId
            const { name, youtubeUrl } = req.body
            const isUpdated = await bloggersRepositories.updateBlogger(id, name, youtubeUrl)

            if (!isUpdated) {
                res.send(404)
                return
            }

            res.send(204)
        })
//Удаление блоггера
    .delete('/:bloggerId',
        authMiddleware,
        async (req: Request, res: Response) => {
            const id = +req.params.bloggerId

            const isDeleted = await bloggersRepositories.deleteBlogger(id)

            if (!id) {
                res.send(400)
                return
            }

            if (!isDeleted) {
                res.send(404)
                return
            }

            res.send(204)

        })