import {
    DollarSign,
    Home,
    PlusSquare,
    Settings,
    ShoppingCart,
    Users,
    UserSquare,
} from 'lucide-react'

export const navItems = [
    {
        to: '/',
        label: 'Dashboard',
        icon: <Home className="h-5 w-5" />,
        roles: ['superAdmin', 'admin', 'user', 'teamManager', 'teamLeader'],
    },
    {
        to: '/add-order',
        label: 'Add Order',
        icon: <PlusSquare className="h-5 w-5" />,
        roles: ['superAdmin', 'admin', 'user'],
    },
    {
        to: '/orders',
        label: 'Orders',
        icon: <ShoppingCart className="h-5 w-5" />,
        badge: 6,
        roles: ['superAdmin', 'admin', 'user'],
    },
    {
        to: '/invoices',
        label: 'Invoices',
        icon: <DollarSign className="h-5 w-5" />,
        roles: ['superAdmin', 'admin', 'user'],
    },
    {
        to: '/customers',
        label: 'Customers',
        icon: <Users className="h-5 w-5" />,
        roles: ['superAdmin'],
    },
    {
        to: '/users',
        label: 'Users',
        icon: <UserSquare className="h-4 w-4" />,
        roles: ['superAdmin', 'admin'],
    },
    {
        to: '#',
        label: 'Settings',
        icon: <Settings className="h-5 w-5" />,
        roles: ['superAdmin', 'admin', 'user'],
    },
]

export const expenseTabs = [
    { name: 'Expense Record', link: '/expense-record' },
    { name: 'Create Expense', link: '/create-expense' },
    { name: 'Expenses Head', link: '/expenses-head' },
    { name: 'Add Expenses Head', link: '/add-expenses-head' },
]
