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

const tabs = [
    {
        id: 1,
        name: 'Expense Record',
        link: '/dashboard/expense-record',
    },
    {
        id: 2,
        name: 'Create Expense',
        link: '/dashboard/create-expense',
    },
    {
        id: 1,
        name: 'Expenses Head',
        link: '/dashboard/expenses-head',
    },
    {
        id: 1,
        name: 'Add Expenses Head',
        link: '/dashboard/add-expenses-head',
    },
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
                        <Link
                            to={'/dashboard'}
                            className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            to={'/dashboard/add-order'}
                            className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <PlusSquare className="h-5 w-5" />
                            Add Order
                        </Link>
                        <Link
                            to={'/dashboard/previous-orders'}
                            className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Previous Orders
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </Link>
                        <Link
                            to={'/dashboard/invoices'}
                            className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <DollarSign className="h-5 w-5" />
                            Invoices
                        </Link>
                        <Link
                            to={'/dashboard/customer-support'}
                            className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <Users className="h-5 w-5" />
                            Customer Support
                        </Link>
                        <div>
                            <Button
                                variant="ghost"
                                className={`flex items-center justify-between w-full gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${isExpenseOpen && 'text-primary bg-gray-100 rounded-b-none'}`}
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
                                    {tabs.map((tab, index) => (
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
                        <button
                            className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </button>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )
}
