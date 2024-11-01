import {
    ChevronDown,
    ChevronUp,
    DollarSign,
    Edit2Icon,
    Home,
    Menu,
    Package2,
    PlusSquare,
    Settings,
    ShoppingCart,
    Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const navItems = [
    {
        to: '/dashboard',
        label: 'Dashboard',
        icon: <Home className="h-5 w-5" />,
    },
    {
        to: '/dashboard/add-order',
        label: 'Add Order',
        icon: <PlusSquare className="h-5 w-5" />,
    },
    {
        to: '/dashboard/previous-orders',
        label: 'Previous Orders',
        icon: <ShoppingCart className="h-5 w-5" />,
        badge: 6,
    },
    {
        to: '/dashboard/invoices',
        label: 'Invoices',
        icon: <DollarSign className="h-5 w-5" />,
    },
    {
        to: '/dashboard/customers',
        label: 'Customers',
        icon: <Users className="h-5 w-5" />,
    },
    {
        to: '#',
        label: 'Settings',
        icon: <Settings className="h-5 w-5" />,
    },
]

const expenseTabs = [
    { name: 'Expense Record', link: '/dashboard/expense-record' },
    { name: 'Create Expense', link: '/dashboard/create-expense' },
    { name: 'Expenses Head', link: '/dashboard/expenses-head' },
    { name: 'Add Expenses Head', link: '/dashboard/add-expenses-head' },
]

export default function Header() {
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

    return (
        <header className="flex items-center gap-4 px-4 lg:px-6 p-2 md:p-0">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            to={'/'}
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                                    location.pathname === item.to &&
                                    'text-primary'
                                }`}
                            >
                                {item.icon}
                                {item.label}
                                {item.badge && (
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        ))}
                        <div>
                            <Button
                                variant="ghost"
                                className={`flex items-center justify-between w-full gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                                    isExpenseOpen &&
                                    'text-primary bg-gray-100 rounded-b-none'
                                }`}
                                onClick={handleToggle}
                            >
                                <span className="flex items-center gap-3 text-lg">
                                    <Edit2Icon className="h-4 w-4" />
                                    Daily Process
                                </span>
                                {isExpenseOpen ? (
                                    <ChevronUp />
                                ) : (
                                    <ChevronDown />
                                )}
                            </Button>
                            {isExpenseOpen && (
                                <ul className="bg-gray-100 rounded-b-lg pl-4 list-disc">
                                    {expenseTabs.map((tab, index) => (
                                        <Link
                                            key={index}
                                            to={tab.link}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                                location.pathname ===
                                                    tab.link && 'text-primary',
                                            )}
                                        >
                                            <li className="ml-4">{tab.name}</li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )
}
