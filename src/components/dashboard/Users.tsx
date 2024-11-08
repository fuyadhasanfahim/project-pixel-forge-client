import { useGetAllUsersQuery } from '@/features/auth/authApi'
import IUser from '@/types/userInterface'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { User2 } from 'lucide-react'

export default function Users() {
    const { data, isLoading } = useGetAllUsersQuery([])

    const users = data?.users || []

    if (isLoading)
        return (
            <div className="h-dvh w-full flex text-center justify-center">
                Loading...
            </div>
        )

    return (
        <div className="p-4 space-y-8">
            <div className="flex items-center justify-between gap-10">
                <h1 className="text-2xl font-bold">Users</h1>

                <Link to="/users/create-user">
                    <Button className="flex items-center gap-2">
                        <User2 /> Create User
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user: IUser) => (
                    <Link to={`/users/${user.username}`}>
                        <div
                            key={user._id}
                            className="relative bg-white shadow-lg rounded-lg p-6 flex flex-col items-center ring-1 ring-gray-800/5 transform hover:scale-105 duration-300 transition-all"
                        >
                            <img
                                src={user.profileImage}
                                alt={user.name}
                                className="w-24 h-24 rounded-full border-2 border-gray-200 mb-4"
                            />
                            <h2 className="text-lg font-semibold">
                                {user.name}
                            </h2>
                            <p className="text-gray-500">{user.username}</p>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-400">{user.phone}</p>
                            <p className="text-gray-400">{user.country}</p>
                            <div className="mt-4">
                                <span
                                    className={`inline-block px-4 py-1 text-xs font-bold text-white rounded-full ${
                                        user.isActive === 'active'
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                    }`}
                                >
                                    {user.isActive}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
