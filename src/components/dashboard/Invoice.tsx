import { useGetCustomersQuery } from '@/features/customer/customerApi'
import ICustomerInterface from '@/types/customerInterface'
import { Eye } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export default function Invoice() {
    const { data, isLoading } = useGetCustomersQuery([])

    if (isLoading)
        return (
            <div className="h-dvh w-full flex justify-center items-center text-lg font-medium">
                Loading...
            </div>
        )

    const { customers } = data || []

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Customer Invoices
            </h1>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {customers.map((customer: ICustomerInterface) => (
                    <div
                        key={customer._id}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center ring-1 ring-gray-800/5 transition-transform transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-1">
                            {customer.customerName}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {customer.customerEmail}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {customer.customerAddress}
                        </p>

                        <Link
                            to={`/invoices/${customer.customerId}`}
                            className="mt-4 flex items-center space-x-2"
                        >
                            <Button className="flex items-center gap-2">
                                <Eye className="h-5 w-5" />
                                View Details
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
