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
import toast from 'react-hot-toast'
import { useGetCustomersQuery } from '@/features/customer/customerApi'
import ICustomerFormData from '@/types/customerInterface'

export default function Customers() {
    const { data, isLoading, error } = useGetCustomersQuery([])
    const customers = (data?.customers as ICustomerFormData[]) || []

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        toast.error('Failed to fetch customers')
        return <div>Error loading customers.</div>
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
                <Table>
                    <TableHeader>
                        <TableRow className="bg-green-500">
                            <TableHead className="border border-black text-white">
                                Customer Id
                            </TableHead>
                            <TableHead className="border border-black text-white">
                                Customer Name
                            </TableHead>
                            <TableHead className="border border-black text-white">
                                Customer Email
                            </TableHead>
                            <TableHead className="border border-black text-white">
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
