import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import { ChevronDown, ChevronUp, Edit2Icon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { expenseTabs, navItems } from '@/data/DashNav'

export default function Header() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { role } = user as IUser

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

    const filteredNavItems = navItems.filter((item) =>
        item.roles.includes(role),
    )

    return (
        <header
            className="flex items-center gap-4 px-4 lg:px-6 p-2 md:p-0"
            id="sidebar"
        >
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        {filteredNavItems.map((item, index) => (
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
