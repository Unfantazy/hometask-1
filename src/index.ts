import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from "body-parser"

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

let bloggers: BloggerType[] = [
    { id: 1, youtubeUrl: 'IT-KAMASUTRA.com', name: "Dimych" },
    { id: 2, youtubeUrl: 'Incubator.ru', name: "Incubator" },
    { id: 3, youtubeUrl: 'Omagad.ru', name: "Omagad" },
    { id: 4, youtubeUrl: 'BeautyBlogger.ru', name: "BeautyBlogger" },
]
let posts: PostType[] = [
    { id: 1, bloggerId: 1, bloggerName: 'Blogger1', content: 'Content1', shortDescription: 'shortDescription1', title: 'Info1' },
    { id: 2, bloggerId: 2, bloggerName: 'Blogger2', content: 'Content2', shortDescription: 'shortDescription2', title: 'Info2' },
    { id: 3, bloggerId: 2, bloggerName: 'Blogger3', content: 'Content3', shortDescription: 'shortDescription3', title: 'Info3' },
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

//Получение всех блоггеров
app.get('/bloggers', (req: Request, res: Response) => {
    res.send(bloggers)
})
//Добавление нового блоггера
app.post('/bloggers', (req: Request, res: Response) => {

    const { name, youtubeUrl } = req.body

    const newBlogger: BloggerType = {
        id: +(new Date()),
        name,
        youtubeUrl
    }

    if (!youtubeUrl || !name) {
        res.send(400)
        return
    }

    bloggers.push(newBlogger)
    res.send(bloggers)
})
//Найти блоггера по ID
app.get('/bloggers/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId

    const blogger = bloggers.find(blogger => blogger.id === id) ?? null

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

    const blogger = bloggers.find(blogger => blogger.id === id)

    if (!id) {
        res.send(400)
        return
    }

    if (!blogger) {
        res.send(404)
        return
    }

    blogger.name = name
    blogger.youtubeUrl = youtubeUrl

    res.send(204)
})
//Удаление блоггера
app.delete('/bloggers/:bloggerId', (req: Request, res: Response) => {
    const id = +req.params.bloggerId

    if (!id) {
        res.send(400)
        return
    }

    const newBloggers = bloggers.filter(blogger => blogger.id !== id)

    if (newBloggers.length >= bloggers.length) {
        res.send(404)
        return
    }

    bloggers = newBloggers
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

    posts = newPosts
    res.send(204)

})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
