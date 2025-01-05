import { connect } from 'mongoose'
import User from '@/models/User'
import Blog from '@/models/Blog'

let isConnected = false

export default async function connectToDatabase(): Promise<void> {
    if (isConnected) {
        console.log('Already connected to the database')
        return
    }
    console.log(process.env.MONGO_URI as string || "mongodb://localhost:27017/blog")
    try {
        console.log('Connecting to DB...'.yellow)
        await connect(process.env.MONGO_URI as string || "mongodb://localhost:27017/blog")
        isConnected = true
        console.log('Connected to DB!'.green)
    } catch (error) {
        console.error('Error connecting to database:', error)
        throw new Error('Failed to connect to database')
    }
}
