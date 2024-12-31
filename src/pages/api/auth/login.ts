import {NextApiRequest, NextApiResponse} from 'next'
import connectToDatabase from '../../../lib/mongodb'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await connectToDatabase()
            console.log("connected")
            const {username, password} = req.body

            if (!username || !password) {
                return res.status(400).json({success: false, message: 'username and password are required'})
            }

            const user = await User.findOne({username})
            console.log(user)

            if (!user) {
                return res.status(401).json({success: false, message: 'username or password is invalid'})
            }

            const isMatch = await user.matchPassword(password)

            if (!isMatch) {
                return res.status(401).json({success: false, message: 'username or password is invalid'})
            }

            const token = jwt.sign(
                {id: user._id, username: user.username},
                JWT_SECRET,
                {expiresIn: '1h'}
            )

            res.status(200).json({success: true, token})
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'internal server error'})
        }
    } else {
        res.status(405).json({success: false, message: 'invalid method'})
    }
}
