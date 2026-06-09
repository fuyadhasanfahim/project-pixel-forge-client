import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { IAddExpenseHead } from '@/types/expense.interface'

export default function ExpenseHead({
    setExpenseHead,
    expenses,
}: {
    setExpenseHead: (value: string) => void
    expenses: IAddExpenseHead[]
}) {
    return (
        <div className="w-full">
            <Label htmlFor="credit-type" className="mb-2 text-gray-700">
                Expenses Head
            </Label>
            <Select onValueChange={setExpenseHead}>
                <SelectTrigger id="credit-type" className="w-full">
                    <SelectValue placeholder="Select credit type" />
                </SelectTrigger>
                <SelectContent>
                    {expenses.map((expense, index) => (
                        <SelectItem key={index} value={expense?.name}>
                            {expense?.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
