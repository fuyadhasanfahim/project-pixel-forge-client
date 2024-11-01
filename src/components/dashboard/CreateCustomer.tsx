import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, ChangeEvent, FormEvent } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface CustomerFormData {
    customerId: string
    customerName: string
    customerEmail: string
    customerAddress: string
}

export default function CreateCustomer() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<CustomerFormData>({
        customerId: '',
        customerName: '',
        customerEmail: '',
        customerAddress: '',
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch(
                'http://localhost:5000/api/v1/customers/create-customer',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data: formData }),
                },
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create customer')
            }

            toast.success(result.message)
            setFormData({
                customerId: '',
                customerName: '',
                customerEmail: '',
                customerAddress: '',
            })

            navigate('/dashboard/customers')
        } catch (err) {
            toast.error((err as Error).message) // Show error toast
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
                                value={formData.customerId}
                                onChange={handleChange}
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
                                value={formData.customerName}
                                onChange={handleChange}
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
                                value={formData.customerEmail}
                                onChange={handleChange}
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
                                value={formData.customerAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="mx-auto items-center flex">
                        Create Customer
                    </Button>
                </form>
            </div>
        </div>
    )
}
