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

export default function CreateExpense() {
    return (
        <div className="m-4 h-screen max-h-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                Add Expenses
            </h1>

            <form
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
                                required
                                className="py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <PicDate />
                    </div>

                    <div className="flex items-center gap-5">
                        <SelectCredit />
                        <ExpenseHead />
                        <Reference />
                        <Amount />
                    </div>
                </div>

                <div className="mt-6 w-full">
                    <Label htmlFor="note" className="block mb-2 text-gray-700">
                        Add note
                    </Label>
                    <Textarea
                        id="note"
                        name="note"
                        placeholder="Note..."
                        required
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
                    />
                </div>

                <div className="flex justify-end mt-10">
                    <Button
                        type="submit"
                        variant={'default'}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300"
                    >
                        Submit Expense
                    </Button>
                </div>
            </form>
        </div>
    )
}
