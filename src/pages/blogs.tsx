import {useEffect, useState} from "react";
import {BlogType} from "@/types/BlogType";
import {router} from "next/client";
import {BlogList} from "@/components/BlogList";

export default function Blogs() {

    const [blogs, setBlogs] = useState<BlogType[]>([])

    useEffect(() => {
        fetchBlogs()
    }, []);

    const fetchBlogs = async () => {
        const response: Response = await fetch('/api/blog/blogs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        setBlogs(data.blogs)
    }

    return (
        <section>
            <div className={"container mx-auto py-8 text-white px-2"}>
                <div className={"text-center text-4xl"}>
                    <h1>Blogs</h1>
                </div>
                <BlogList blogs={blogs}/>
            </div>
        </section>
    )
}