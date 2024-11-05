import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCreateUserMutation } from '@/features/auth/authApi'

export default function CreateUser() {
    const [createUser, { isLoading }] = useCreateUserMutation()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [country, setCountry] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('The passwords do not match.')
            return
        }

        toast
            .promise(
                createUser({
                    name,
                    username,
                    email,
                    phone,
                    company,
                    country,
                    role,
                    password,
                }).unwrap(),
                {
                    loading: 'Creating user...',
                    success:
                        'Created user successfully. An email was sent to the user for verification.',
                    error: (error) =>
                        `Failed to create user: ${(error as Error).message}`,
                },
            )
            .then(() => {
                setName('')
                setUsername('')
                setEmail('')
                setPhone('')
                setCompany('')
                setCountry('')
                setPassword('')
                setConfirmPassword('')
                setRole('')
            })
    }

    return (
        <form
            action=""
            onSubmit={handleSubmit}
            className="w-full max-w-md m-20 mx-auto"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-center mb-10">
                        Create User
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="company">Company</Label>
                        <Input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Enter your company"
                            autoComplete="organization"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="country">Country</Label>
                        <Input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="Enter your country"
                            autoComplete="country-name"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="select-role">Select Role</Label>
                        <Select
                            value={role}
                            onValueChange={(value) => setRole(value)}
                        >
                            <SelectTrigger className="w-full" id="select-role">
                                <SelectValue placeholder="Select a Role for user" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="user">
                                        User (default)
                                    </SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="accountant">
                                        Accountant
                                    </SelectItem>
                                    <SelectItem value="teamManager">
                                        Team Manager
                                    </SelectItem>
                                    <SelectItem value="teamLeader">
                                        Team Leader
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirm-password">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating User...' : 'Create User'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
