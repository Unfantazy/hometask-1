import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser"
import { posts } from "./repositories/db";
import { bloggersRepositories } from "./repositories/bloggers-repositories";

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000



app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

//Получение всех блоггеров
app.get('/bloggers', (req: Request, res: Response) => {
    res.send(bloggersRepositories.getBloggers())
})
//Добавление нового блоггера
app.post('/bloggers', (req: Request, res: Response) => {

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

    res.send(blogger)
})
//Найти блоггера по ID
app.get('/bloggers/:bloggerId', (req: Request, res: Response) => {
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
app.put('/bloggers/:bloggerId', (req: Request, res: Response) => {
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
app.delete('/bloggers/:bloggerId', (req: Request, res: Response) => {
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


//Получение всех постов
app.get('/posts', (req: Request, res: Response) => {
    res.send(posts)
})
//Добавление нового поста
app.post('/posts', (req: Request, res: Response) => {

    const { title, shortDescription, content, bloggerId } = req.body

    const newPost: PostType = {
        id: +(new Date()),
        bloggerId,
        content,
        shortDescription,
        title,
    }

    if (!bloggerId) {
        res.send(400)
        return
    }

    posts.push(newPost)
    res.send(posts)
})
//Найти пост по ID
app.get('/posts/:postId', (req: Request, res: Response) => {
    const id = +req.params.postId

    const post = posts.find(post => post.id === id) ?? null

    if (!id) {
        res.send(400)
        return
    }

    if (!post) {
        res.send(404)
        return
    }

    res.send(post)
})
//Изменить информацию в посте
app.put('/posts/:postId', (req: Request, res: Response) => {
    const id = +req.params.postId
    const { title, shortDescription, content, bloggerId } = req.body

    let post = posts.find(post => post.id === id)

    if (!id || !bloggerId) {
        res.send(400)
        return
    }

    if (!post) {
        res.send(404)
        return
    }

    post.content = content
    post.title = title
    post.shortDescription = shortDescription


    res.send(204)
})
//Удаление блоггера
app.delete('/posts/:postId', (req: Request, res: Response) => {
    const id = +req.params.postId

    if (!id) {
        res.send(400)
    }

    const newPosts = posts.filter(post => post.id !== id)

    if (newPosts.length >= posts.length) {
        res.send(404)
    }

    // @ts-ignore
    posts = newPosts
    res.send(204)

})



app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
