import { Request, Response, Router } from 'express'
import { bloggersRepositories } from '../repositories/bloggers-repositories'
import { body } from 'express-validator'
import { inputValidatorMiddleware } from '../middlewares/input-validator-middleware'

export const bloggersRouter = Router({})


bloggersRouter
//Получение всех блоггеров
    .get('/', (req: Request, res: Response) => {
        res.send(bloggersRepositories.getBloggers())
    })
//Добавление нового блоггера
    .post('/',

        body('name').isLength({ min: 1, max: 15 }).withMessage('The Name field is required'),
        body('youtubeUrl').isLength({ min: 1, max: 100 }).withMessage('The YoutubeUrl field is required.').isURL(),
        inputValidatorMiddleware,

        (req: Request, res: Response) => {
            const { name, youtubeUrl } = req.body

            const blogger = bloggersRepositories.createBlogger(name, youtubeUrl)

            res.status(201).send(blogger)
        })
//Найти блоггера по ID
    .get('/:bloggerId', (req: Request, res: Response) => {
        const id = +req.params.bloggerId

        const blogger = bloggersRepositories.getBloggerById(id)

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

        body('name').isLength({ min: 1, max: 15 }).withMessage('The Name field is required'),
        body('youtubeUrl').isLength({ min: 1, max: 100 }).isURL().withMessage('The YoutubeUrl field is required.'),
        inputValidatorMiddleware,

        (req: Request, res: Response) => {
            const id = +req.params.bloggerId
            const { name, youtubeUrl } = req.body
            const isUpdated = bloggersRepositories.updateVideo(id, name, youtubeUrl)

            if (!isUpdated) {
                res.send(404)
                return
            }

            res.send(204)
        })
//Удаление блоггера
    .delete('/:bloggerId', (req: Request, res: Response) => {
        const id = +req.params.bloggerId

        const isDeleted = bloggersRepositories.deleteVideo(id)

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