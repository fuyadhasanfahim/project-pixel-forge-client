import { Input } from '@/components/ui/input'
import { Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PicDate from './expense-props/create-expense/PicDate'
import SelectCredit from './expense-props/create-expense/SelectCredit'
import ExpenseHead from './expense-props/create-expense/ExpenseHead'
import Reference from './expense-props/create-expense/Reference'
import Amount from './expense-props/create-expense/Amount'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import {
    useCreateExpenseMutation,
    useGetExpenseHeadQuery,
} from '@/features/expense/expenseApi'
import toast from 'react-hot-toast'
import moment from 'moment'

function generateExpenseNumber() {
    return `EXP-${moment().format('DDMMYYYYhhmm')}`
}

export default function CreateExpense() {
    const [createExpense, { isLoading }] = useCreateExpenseMutation()
    const { data, isLoading: isFetching } = useGetExpenseHeadQuery([])
    const { expenses } = data || []

    useEffect(() => {
        setExpenseNo(generateExpenseNumber())
    }, [])

    const [expenseNo, setExpenseNo] = useState(generateExpenseNumber())
    const [date, setDate] = useState<Date>()
    const [creditType, setCreditType] = useState('')
    const [notes, setNotes] = useState('')
    const [amount, setAmount] = useState('')
    const [reference, setReference] = useState('')
    const [expenseHead, setExpenseHead] = useState('')

    if (isFetching) {
        return <div>Loading...</div>
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = {
            expenseNumber: expenseNo,
            date,
            credit: creditType,
            notes,
            amount,
            reference,
            expenseHead,
        }

        try {
            console.log(formData)
            await createExpense(formData).unwrap()

            toast.success('Expense created successfully')
            setExpenseNo(generateExpenseNumber())
            setCreditType('')
            setNotes('')
            setAmount('')
            setReference('')
            setExpenseHead('')
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message || 'Error creating expense')
        }
    }

    return (
        <div className="m-4 h-screen max-h-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                Add Expenses
            </h1>

            <form
                onSubmit={handleSubmit}
                action=""
                className="w-full max-w-4xl border rounded-lg shadow-lg p-8 bg-white"
            >
                <h3 className="text-xl font-medium text-center text-gray-700 mb-6">
                    EXPENSES VOUCHER
                </h3>

                <div className="flex items-center justify-center gap-2 mb-8 text-gray-600">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="text-lg">
                        Balance:{' '}
                        <span className="font-semibold text-gray-800">
                            $20,000
                        </span>
                    </h3>
                </div>

                <div className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="w-full">
                            <Label
                                htmlFor="expense-no"
                                className="block mb-2 text-gray-700"
                            >
                                Expense Number
                            </Label>
                            <Input
                                id="expense-no"
                                type="text"
                                name="expense-no"
                                placeholder="Enter Expense No."
                                value={expenseNo}
                                onChange={(e) => setExpenseNo(e.target.value)}
                                required
                                readOnly
                                className="py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <PicDate date={date} setDate={setDate} />
                    </div>

                    <div className="flex items-center gap-5">
                        <SelectCredit setCreditType={setCreditType} />
                        <ExpenseHead
                            setExpenseHead={setExpenseHead}
                            expenses={expenses}
                        />
                        <Reference setReference={setReference} />
                        <Amount amount={amount} setAmount={setAmount} />
                    </div>
                </div>

                <div className="mt-6 w-full">
                    <Label htmlFor="note" className="block mb-2 text-gray-700">
                        Add note
                    </Label>
                    <Textarea
                        id="note"
                        name="note"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Note..."
                        required
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
                    />
                </div>

                <div className="flex justify-end mt-10">
                    <Button
                        type="submit"
                        variant={'default'}
                        disabled={isLoading}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300"
                    >
                        Submit Expense
                    </Button>
                </div>
            </form>
        </div>
    )
}
