import {NextApiRequest, NextApiResponse} from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

interface DecodedToken {
    id: string
    username: string
    iat: number
    exp: number
}

export function authenticate(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({message: 'Authentication token is missing'})
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
        req.user = decoded
        return null
    } catch (error) {
        return res.status(401).json({message: 'Invalid or expired token'})
    }
}
