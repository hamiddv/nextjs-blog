import {FormEvent, useState} from 'react'
import {useRouter} from 'next/router'
import useToken from "@/hooks/useToken";
import {redirect} from "next/navigation";

export default function CreateBlog() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const token = useToken()
    console.log(token)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const title = formData.get('title')
        const content = formData.get('content')

        const response: Response = await fetch('/api/blog/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Barrier ' + token
            },
            body: JSON.stringify({title, content}),
        })

        if (response.ok) {
            router.push('/blogs')

        } else if (response.status === 401) {
            router.push("/login")
        } else {
        const data = await response.json()
            setError(data.message)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className={"container mx-auto"}>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center gap-6 w-full p-8 bg-white shadow-2xl rounded-xl"
                >
                    <h3 className={"text-3xl"}>Create Blog</h3>
                    <input
                        className="rounded-xl text-xl w-full bg-[#454554] shadow-2xl py-3 px-4 text-white"
                        type="text"
                        name="title"
                        placeholder="Title"
                        required
                    />
                    <textarea
                        className="rounded-xl text-xl w-full bg-[#454554] shadow-2xl py-3 px-4 text-white"
                        name="content"
                        placeholder="Content"
                        required
                    />
                    {
                        error && <span className={"text-red-500"}>
                        {error}
                        </span>
                    }
                    <button type="submit" className="py-3 text-xl w-full px-4 bg-blue-500 text-white rounded-xl">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}
