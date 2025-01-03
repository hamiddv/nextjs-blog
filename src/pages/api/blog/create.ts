import {NextApiRequest, NextApiResponse} from "next";
import {authenticate} from "@/middlewares/authenticate"
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import {DecodedToken} from "@/types/DecodedToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const user = authenticate(req, res)
        console.log(user)
        const {title, content} = req.body
        console.log(title, content)

        await connectToDatabase();
        const blog = await Blog.create({title, content, user: (user as DecodedToken).id})
        res.status(201).json({
            blog
        })

    } else {
        res.status(405).json({success: false, message: 'invalid method'})
    }

}
