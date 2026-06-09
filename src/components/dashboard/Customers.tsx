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
import ICustomerInterface from '@/types/customerInterface'
import Customer from './Customer'

export default function Customers() {
    const { data, isLoading, error } = useGetCustomersQuery([])
    const customers = (data?.customers as ICustomerInterface[]) || []

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
                    <Link to={'/customers/create-customer'}>Add Customer</Link>
                </Button>
            </div>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-green-500">
                            <TableHead className="border border-black text-white text-center">
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
                            <TableHead className="border border-black text-white text-center">
                                Orders
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.length > 0 ? (
                            customers.map((customer, index) => {
                                return (
                                    <Customer key={index} customer={customer} />
                                )
                            })
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
