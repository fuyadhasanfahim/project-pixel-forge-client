import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp, Edit2Icon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
    {
        id: 1,
        name: 'Expense Record',
        link: '/expense-record',
    },
    {
        id: 2,
        name: 'Create Expense',
        link: '/create-expense',
    },
    {
        id: 1,
        name: 'Expenses Head',
        link: '/expenses-head',
    },
    {
        id: 1,
        name: 'Add Expenses Head',
        link: '/add-expenses-head',
    },
]

export default function ExpenseTab({
    isExpenseOpen,
    handleToggle,
}: {
    isExpenseOpen: boolean
    handleToggle: () => void
}) {
    const location = useLocation()

    return (
        <div>
            <Button
                variant="ghost"
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full justify-between',
                    isExpenseOpen && 'bg-gray-100 text-primary rounded-b-none',
                )}
                onClick={handleToggle}
            >
                <span className="flex items-center gap-3">
                    <Edit2Icon className="h-4 w-4" />
                    Daily Process
                </span>
                {isExpenseOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
            {isExpenseOpen && (
                <ul className="bg-gray-100 rounded-b-lg pl-4 list-disc">
                    {tabs.map((tab, index) => (
                        <Link
                            key={index}
                            to={tab.link}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                location.pathname === tab.link &&
                                    'text-primary',
                            )}
                        >
                            <li className="ml-4">{tab.name}</li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    )
}
