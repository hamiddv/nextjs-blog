import {NextApiRequest, NextApiResponse} from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const protect = (handler: Function) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({success: false, message: 'token is required'});
        }

        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({success: false, message: 'token is invalid'});
        }
    };
};
