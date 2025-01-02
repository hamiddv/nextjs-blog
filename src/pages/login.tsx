import { FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
        const password = formData.get('password')

        const response: Response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            const data = await response.json()
            localStorage.setItem("token", data.token)
            router.push('/')
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-6 w-[500px] p-8 bg-white bg-opacity-90 shadow-2xl rounded-xl"
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
                <button type="submit" className="py-3 text-xl w-full px-4 bg-blue-500 text-white rounded-xl">
                    Login
                </button>
            </form>
        </div>
    )
}
