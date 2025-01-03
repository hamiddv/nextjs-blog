import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/mongoose"
import Blog from "@/models/Blog"
import mongoose from "mongoose"
import connectToDatabase from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        await connectToDatabase()

        const { id } = req.query

        try {
            if (!mongoose.Types.ObjectId.isValid(id as string)) {
                return res.status(400).json({ success: false, message: "Invalid ID format" })
            }

            const blog = await Blog.findById(id)
            if (!blog) {
                return res.status(404).json({ success: false, message: "Blog not found" })
            }

            res.status(200).json(blog)
        } catch (error) {
            console.error("Error fetching blog:", error)
            res.status(500).json({ success: false, message: "Internal Server Error" })
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" })
    }
}
