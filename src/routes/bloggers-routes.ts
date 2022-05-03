import { Request, Response, Router } from "express";
import { bloggersRepositories } from "../repositories/bloggers-repositories";

export const bloggersRouter = Router({})

bloggersRouter
//Получение всех блоггеров
.get('/', (req: Request, res: Response) => {
    res.send(bloggersRepositories.getBloggers())
})
//Добавление нового блоггера
.post('/', (req: Request, res: Response) => {

    const errorsMessages: ErrorType[] = []
    const { name, youtubeUrl } = req.body

    if (!youtubeUrl) {
        errorsMessages.push({ field: "youtubeUrl", message: "The YoutubeUrl field is required." })
    }

    if (!name) {
        errorsMessages.push({ field: "name", message: "The Name field is required." })
    }

    if (errorsMessages.length) {
        res.status(400).send(errorsMessages)
        return
    }

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
.put('/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId
    const { name, youtubeUrl } = req.body
    const isUpdated = bloggersRepositories.updateVideo(id, name, youtubeUrl)

    if (!id) {
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