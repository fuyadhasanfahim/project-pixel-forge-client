import {
    DollarSign,
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

export default function Header() {
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
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            to={'/dashboard/add-order'}
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <PlusSquare className="h-5 w-5" />
                            Add Order
                        </Link>
                        <Link
                            to={'/dashboard/previous-orders'}
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Previous Orders
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                6
                            </Badge>
                        </Link>
                        <Link
                            to={'/dashboard/invoices'}
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <DollarSign className="h-5 w-5" />
                            Invoices
                        </Link>
                        <Link
                            to={'/dashboard/customer-support'}
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
                        >
                            <Users className="h-5 w-5" />
                            Customer Support
                        </Link>
                        <button
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${location.pathname === '/dashboard' && 'text-primary'}`}
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
