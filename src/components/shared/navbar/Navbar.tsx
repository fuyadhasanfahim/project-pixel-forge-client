import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import LogoImage from '../../../assets/images/logo.png'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import { userLoggedOut } from '@/features/auth/authSlice'
import Cookies from 'js-cookie'
import { MouseEvent } from 'react'

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    const handleLogout = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(userLoggedOut())
        Cookies.remove('accessToken')
        navigate('/auth')
    }

    return (
        <nav className="w-full p-4 border-b">
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-10">
                <div>
                    <Link to="/" className="">
                        <img
                            src={LogoImage}
                            alt="web briks logo"
                            className="h-6"
                        />
                    </Link>
                </div>

                <div>
                    <ul className="flex items-center gap-10 justify-between">
                        <li>
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </li>
                        <li>
                            {!user ? (
                                <Link to={'/auth'}>Sign In</Link>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            className="rounded-full"
                                        >
                                            <img
                                                src={
                                                    (user as IUser)
                                                        ?.profileImage
                                                }
                                                alt="profileImage"
                                                className="rounded-full"
                                            />
                                            <span className="sr-only">
                                                Toggle user menu
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            My Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
