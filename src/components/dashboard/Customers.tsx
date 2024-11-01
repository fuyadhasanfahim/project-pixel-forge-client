import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from '../ui/table'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Customer {
    customerId: string
    customerName: string
    customerEmail: string
    customerAddress: string
}

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/v1/customers/get-customers',
                )
                const result = await response.json()

                if (!response.ok) {
                    throw new Error(
                        result.message || 'Failed to fetch customers',
                    )
                }

                setCustomers(result.customers)
            } catch (err) {
                setError((err as Error).message)
                toast.error((err as Error).message) // Show error toast
            } finally {
                setLoading(false)
            }
        }

        fetchCustomers()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-4 w-full space-y-8">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-xl">All Customers</h2>
                <Button>
                    <Link to={'/dashboard/customers/create-customer'}>
                        Add Customer
                    </Link>
                </Button>
            </div>

            <div>
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border border-black">
                                Customer Id
                            </TableHead>
                            <TableHead className="border border-black">
                                Customer Name
                            </TableHead>
                            <TableHead className="border border-black">
                                Customer Email
                            </TableHead>
                            <TableHead className="border border-black">
                                Customer Address
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <TableRow key={customer.customerId}>
                                    <TableCell className="border border-black">
                                        {customer.customerId}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        {customer.customerName}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        {customer.customerEmail}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        {customer.customerAddress}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="border border-black text-center"
                                >
                                    No customers found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
