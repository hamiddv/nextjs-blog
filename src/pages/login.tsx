import {FormEvent} from 'react'
import {useRouter} from 'next/router'

export default function LoginPage() {
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

        if (response.ok) {
            const data = await response.json()
            console.log(data)
            localStorage.setItem("token", data.token)
            router.push('/profile')
        } else {
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
            <input type="text" name="username" placeholder="Email" required/>
            <input type="password" name="password" placeholder="Password" required/>
            <button type="submit">Login</button>
        </form>
    )
}