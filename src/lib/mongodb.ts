import { connect } from 'mongoose'
import User from '../models/User'

let isConnected = false

export default async function connectToDatabase(): Promise<void> {
    if (isConnected) {
        console.log('Already connected to the database')
        return
    }

    try {
        console.log('Connecting to DB...'.yellow)
        await connect(process.env.MONGO_URI as string)
        isConnected = true
        console.log('Connected to DB!'.green)
    } catch (error) {
        console.error('Error connecting to database:', error)
        throw new Error('Failed to connect to database')
    }
}
