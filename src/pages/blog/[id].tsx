import {useEffect, useState} from "react"
import {BlogType} from "@/types/BlogType"
import {useRouter} from "next/router"

export default function Blog() {
    const router = useRouter()
    const {id} = router.query
    const [blog, setBlog] = useState<BlogType>()

    useEffect(() => {
        if (id)
            fetchBlog()
    }, [id]);

    const fetchBlog = async () => {
        const response: Response = await fetch(`/api/blog/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        console.log(data)
        setBlog(data)
    }

    return (
        <section>
            <div className={"container mx-auto py-4 px-2 text-white "}>
                <div className={"text-left text-3xl mb-16"}>
                    <h1>
                        {
                            blog?.title
                        }
                    </h1>
                </div>
                <div className={"max-w-full break-words whitespace-break-spaces"}>
                    {
                        blog?.content
                    }
                </div>
            </div>
        </section>
    )
}