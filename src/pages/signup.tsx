import {FormEvent, useState} from 'react'
import {useRouter} from 'next/router'
import {set} from "mongoose";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

        const response: Response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        })
        const data = await response.json()
        console.log(data)

        if (response.status === 400) {
            setError(data.message)
        }

        if (response.ok) {
            localStorage.setItem("token", data.token)
            router.push('/')
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-6 w-[500px] p-8 bg-white shadow-2xl rounded-xl"
            >
                <h3 className={"text-3xl"}>Signup</h3>
                <input
                    className="rounded-xl text-xl w-full bg-[#454554] shadow-2xl py-3 px-4 text-white"
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                />
                <input
                    className="rounded-xl text-xl w-full bg-[#454554] shadow-2xl py-3 px-4 text-white"
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
                <button type="submit" className="py-3 text-xl w-full px-4 bg-blue-500 text-white rounded-xl">
                    Signup
                </button>
            </form>
        </div>
    )
}
