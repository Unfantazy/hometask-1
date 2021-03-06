import { MongoClient } from 'mongodb'

const mongoUri = process.env.mongoURI || 'mongodb+srv://Unfantazy:q1w2e3r4@cluster0.nxfeq.mongodb.net/bloggers?retryWrites=true&w=majority'

const client = new MongoClient(mongoUri)

const db = client.db('bloggers')
export const bloggersCollection = db.collection<BloggerType>('bloggers')
export const postsCollection = db.collection<PostType>('posts')

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect()
        // Establish and verify connection
        await db.command({ ping: 1 })
        // eslint-disable-next-line no-console
        console.log('Connected successfully to mongo server')

    } catch(e) {
        // eslint-disable-next-line no-console
        console.log(e)
        // Ensures that the client will close when you finish/error
        await client.close()
    }
}
