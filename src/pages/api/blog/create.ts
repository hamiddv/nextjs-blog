import {NextApiRequest, NextApiResponse} from "next";
import {authenticate} from "@/middlewares/authenticate"
import connectToDatabase from "@/lib/mongodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        authenticate(req, res)
        console.log(req.user)
        const userId = req.user.id
        const {title, content} = req.body
        console.log(title, content)

        await connectToDatabase();

    } else {
        res.status(405).json({success: false, message: 'invalid method'})
    }

}
