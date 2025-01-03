import {useEffect, useState} from "react";
import {Blog} from "@/types/Blog";
import {router} from "next/client";

export default function Blogs() {

    const [blogs, setBlogs] = useState<Blog[]>([])

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
                <div className={"mt-8"}>
                    {
                        blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className={"border py-2 px-4 hover:bg-gray-500"}
                                onClick={() => {
                                    router.push(`blog/${blog.id}`)
                                }}
                            >
                                <h3 className={"text-2xl mb-2"}>{blog.title}</h3>
                                <div className="max-w-full break-words">
                                    {
                                        blog.content.length > 200
                                            ? `${blog.content.slice(0, 200)} ...`
                                            : blog.content
                                    }
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </section>
    )
}