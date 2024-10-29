import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        navigate('/auth/forget-password/opt')
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <form action="" className="w-full max-w-md" onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center mb-10">
                            Reset your Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Next
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
