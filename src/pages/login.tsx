import {FormEvent, useState} from 'react'
import {useRouter} from 'next/router'
import Link from "next/link";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

        const response: Response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        })
        const data = await response.json()

        if (response.ok) {
            localStorage.setItem("token", data.token)
            router.push('/')
        } else {
            setError(data.message)
        }

    }

    return (
        <div className="w-full h-screen flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-6 w-full mx-2 sm:w-[500px] md:w-[600px] xl:w-[600px] p-8 bg-white bg-opacity-90 shadow-2xl rounded-xl"
            >
                <h3 className={"text-3xl"}>Login</h3>
                <input
                    className="rounded-xl text-xl w-full bg-[#343541] py-3 px-4 text-white"
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                />
                <input
                    className="rounded-xl text-xl w-full bg-[#343541] py-3 px-4 text-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
                {
                    error && <span className={"text-red-500"}>
                        {error}
                    </span>
                }
                <span>Don&#39;t have an account yet? <Link href={"/signup"}
                                                           className={"text-blue-500"}>Signup</Link></span>
                <button type="submit" className="py-3 text-xl w-full px-4 bg-blue-500 text-white rounded-xl">
                    Login
                </button>
            </form>
        </div>
    )
}
