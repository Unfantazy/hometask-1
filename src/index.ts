import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { runDb } from './repositories/db'
import { bloggersRouter } from './routes/bloggers-routes'
import { postsRouter } from './routes/posts-router'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

const startApp = async () => {
    await runDb()
    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Example app listening on port: ${PORT}`)
    })
}

startApp()