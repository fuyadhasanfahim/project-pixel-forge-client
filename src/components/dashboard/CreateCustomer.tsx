import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCreateCustomerMutation } from '@/features/customer/customerApi'

export default function CreateCustomer() {
    const [createCustomer, { isLoading }] = useCreateCustomerMutation()
    const [customerId, setCustomerId] = useState<string>('')
    const [customerName, setCustomerName] = useState<string>('')
    const [customerEmail, setCustomerEmail] = useState<string>('')
    const [customerAddress, setCustomerAddress] = useState<string>('')
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = {
            customerId,
            customerName,
            customerEmail,
            customerAddress,
        }

        try {
            const result = await createCustomer(formData).unwrap()

            toast.success(result.message || 'Customer created successfully!')

            navigate('/customers')
        } catch (err) {
            toast.error((err as Error).message)
        }
    }

    return (
        <div className="p-4">
            <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Create Customer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between gap-10">
                        <div className="w-full max-w-xs">
                            <label
                                htmlFor="customerId"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Customer ID
                            </label>
                            <Input
                                id="customerId"
                                name="customerId"
                                type="text"
                                placeholder="Enter Customer ID"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full max-w-xs">
                            <label
                                htmlFor="customerName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Customer Name
                            </label>
                            <Input
                                id="customerName"
                                name="customerName"
                                type="text"
                                placeholder="Enter Customer Name"
                                value={customerName}
                                onChange={(e) =>
                                    setCustomerName(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="w-full max-w-xs">
                            <label
                                htmlFor="customerEmail"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Customer Email
                            </label>
                            <Input
                                id="customerEmail"
                                name="customerEmail"
                                type="email"
                                placeholder="Enter Customer Email"
                                value={customerEmail}
                                onChange={(e) =>
                                    setCustomerEmail(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="w-full max-w-xs">
                            <label
                                htmlFor="customerAddress"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Customer Address
                            </label>
                            <Input
                                id="customerAddress"
                                name="customerAddress"
                                type="text"
                                placeholder="Enter Customer Address"
                                value={customerAddress}
                                onChange={(e) =>
                                    setCustomerAddress(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        className="mx-auto items-center flex"
                        disabled={isLoading}
                    >
                        Create Customer
                    </Button>
                </form>
            </div>
        </div>
    )
}
