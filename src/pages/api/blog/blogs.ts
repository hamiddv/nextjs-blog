import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === "GET"){
        await connectToDatabase()
        const blogs = await Blog.find()
        res.status(200).json({blogs})
    }else {
        return res.status(405).json({success: false, message: "Method is not allowed."})
    }
}