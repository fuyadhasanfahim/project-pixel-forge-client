import {
    ShoppingCart,
    Users,
    Home,
    PlusSquare,
    DollarSign,
    Settings,
    Mail,
    User,
    UserSquareIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import { useFetchOrderByUserIdQuery } from '@/features/orders/orderApi'
import ExpenseTab from './dash-nav-prpops/ExpenseTab'
import React, { useEffect, useState } from 'react'

export default function Sidebar() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id, role } = user as IUser
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
            roles: ['superAdmin', 'admin', 'user', 'teamManager', 'teamLeader'],
        },
        {
            to: '/dashboard/add-order',
            label: 'Add Order',
            icon: <PlusSquare className="h-4 w-4" />,
            roles: ['superAdmin', 'admin', 'user'],
        },
        {
            to: '/dashboard/inbox',
            label: 'Inbox',
            icon: <Mail className="h-4 w-4" />,
            roles: ['superAdmin', 'admin'],
        },
        {
            to: '/dashboard/previous-orders',
            label: 'Previous Orders',
            icon: <ShoppingCart className="h-4 w-4" />,
            roles: ['superAdmin', 'admin', 'user'],
            badge: data?.orders?.length ?? 0,
        },
        {
            to: '/dashboard/invoices',
            label: 'Invoices',
            icon: <DollarSign className="h-4 w-4" />,
            roles: ['superAdmin', 'admin', 'user'],
        },
        {
            to: '/dashboard/customers',
            label: 'Customers',
            icon: <Users className="h-4 w-4" />,
            roles: ['superAdmin'],
        },
        {
            to: '/dashboard/create-user',
            label: 'Create User',
            icon: <User className="h-4 w-4" />,
            roles: ['superAdmin'],
        },
        {
            to: '/dashboard/users',
            label: 'Users',
            icon: <UserSquareIcon className="h-4 w-4" />,
            roles: ['superAdmin', 'admin'],
        },
        {
            component: (
                <ExpenseTab
                    isExpenseOpen={isExpenseOpen}
                    handleToggle={handleToggle}
                />
            ),
            roles: ['superAdmin', 'admin', 'accountant'],
        },
        {
            to: '#',
            label: 'Settings',
            icon: <Settings className="h-4 w-4" />,
            roles: ['superAdmin', 'admin', 'user'],
        },
    ]

    const filteredNavItems = navItems.filter((item) =>
        item.roles.includes(role),
    )

    return (
        <div className="hidden border-r bg-muted/40 md:block h-full">
            <div className="flex h-full max-h-screen flex-col gap-2 mt-2">
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {filteredNavItems.length > 0 ? (
                            filteredNavItems.map((item, index) =>
                                item.to ? (
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
                                ),
                            )
                        ) : (
                            <p className="px-3 py-2 text-muted-foreground">
                                You do not have access to any sections.
                            </p>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    )
}
