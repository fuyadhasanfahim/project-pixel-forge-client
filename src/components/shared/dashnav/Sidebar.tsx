import {
    ShoppingCart,
    Users,
    Home,
    PlusSquare,
    DollarSign,
    Settings,
    Slack,
    Mail,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import { useFetchOrderByUserIdQuery } from '@/features/orders/orderApi'
import ExpenseTab from './dash-nav-prpops/ExpenseTab'
import React, { useEffect, useState } from 'react'

export default function Sidebar() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id, profileImage, role } = user as IUser
    const userId = _id
    const { data } = useFetchOrderByUserIdQuery(userId)

    const [isExpenseOpen, setIsExpenseOpen] = useState(() =>
        JSON.parse(localStorage.getItem('isExpenseOpen') || 'false'),
    )

    useEffect(() => {
        localStorage.setItem('isExpenseOpen', JSON.stringify(isExpenseOpen))
    }, [isExpenseOpen])

    const handleToggle = () => {
        setIsExpenseOpen(!isExpenseOpen)
    }

    const location = useLocation()

    const navItems = [
        {
            to: '/dashboard',
            label: 'Dashboard',
            icon: <Home className="h-4 w-4" />,
            roles: ['user', 'superAdmin'],
        },
        {
            to: '/dashboard/add-order',
            label: 'Add Order',
            icon: <PlusSquare className="h-4 w-4" />,
            roles: ['user', 'superAdmin'],
        },
        {
            to: '/dashboard/inbox',
            label: 'Inbox',
            icon: <Mail className="h-4 w-4" />,
            roles: ['superAdmin'],
        },
        {
            to: '/dashboard/previous-orders',
            label: 'Previous Orders',
            icon: <ShoppingCart className="h-4 w-4" />,
            roles: ['user', 'superAdmin'],
            badge: data?.orders?.length ?? 0,
        },
        {
            to: '/dashboard/invoices',
            label: 'Invoices',
            icon: <DollarSign className="h-4 w-4" />,
            roles: ['user', 'superAdmin'],
        },
        {
            to: '/dashboard/customers',
            label: 'Customers',
            icon: <Users className="h-4 w-4" />,
            roles: ['user', 'superAdmin'],
        },
        {
            component: (
                <ExpenseTab
                    isExpenseOpen={isExpenseOpen}
                    handleToggle={handleToggle}
                />
            ),
            roles: ['user', 'superAdmin'],
        },
        {
            to: '#',
            label: 'Settings',
            icon: <Settings className="h-4 w-4" />,
            roles: ['user', 'superAdmin'],
        },
    ]

    return (
        <div className="hidden border-r bg-muted/40 md:block h-full">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex justify-between gap-2 h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        to={'/'}
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Slack className="h-6 w-6" />
                        <span>Project Pixel Forge</span>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <img
                                    src={profileImage}
                                    alt="profileImage"
                                    className="rounded-full"
                                />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map((item, index) => {
                            if (!item.roles.includes(role)) return null

                            return item.to ? (
                                <Link
                                    key={index}
                                    to={item.to}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                        location.pathname === item.to &&
                                        'text-primary'
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                    {item.badge !== undefined && (
                                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </Link>
                            ) : (
                                <React.Fragment key={index}>
                                    {item.component}
                                </React.Fragment>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}
