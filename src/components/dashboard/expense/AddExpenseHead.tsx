import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useAddExpenseHeadMutation } from '@/features/expense/expenseApi'
import toast from 'react-hot-toast'

export default function AddExpenseHead() {
    const [formData, setFormData] = useState({
        name: '',
        creditType: '',
        description: '',
    })
    const [addExpenseHead, { isLoading }] = useAddExpenseHeadMutation()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, creditType: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await addExpenseHead(formData).unwrap()

            toast.success('Expense added successfully.')

            setFormData({
                name: '',
                creditType: '',
                description: '',
            })
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <div className="flex items-center justify-center py-8 h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-3xl font-semibold mb-8 text-center text-primary">
                    Add Expense Head
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label
                            htmlFor="name"
                            className="text-gray-700 font-medium"
                        >
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter expense name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    <div>
                        <Label
                            htmlFor="credit-type"
                            className="text-gray-700 font-medium"
                        >
                            Credit Type
                        </Label>
                        <Select
                            key={formData.creditType}
                            onValueChange={handleSelectChange}
                            required
                        >
                            <SelectTrigger
                                id="credit-type"
                                className="w-full mt-1"
                            >
                                <SelectValue placeholder="Select credit type" />
                            </SelectTrigger>
                            <SelectContent className="z-10">
                                <SelectItem value="Administrative Expense">
                                    Administrative Expense
                                </SelectItem>
                                <SelectItem value="Operating Expense">
                                    Operating Expense
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label
                            htmlFor="description"
                            className="text-gray-700 font-medium"
                        >
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Add a description..."
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>

                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ${
                                isLoading
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-primary-dark'
                            }`}
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
