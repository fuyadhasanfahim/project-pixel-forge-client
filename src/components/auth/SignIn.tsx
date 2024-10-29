import { useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useLoginMutation } from '@/features/auth/authApi'
import toast from 'react-hot-toast'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, { isLoading }] = useLoginMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const userData = { email, password }
            login(userData).unwrap()

            toast.success('Logged in successfully!')
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center mb-10">
                        Sign in to your Account
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Link
                            to={'/auth/forget-password'}
                            className="text-sm flex flex-col items-end w-full hover:underline text-gray-600 font-medium hover:text-black duration-150 transition-all"
                        >
                            Forget password?
                        </Link>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
