import ICustomerInterface from '@/types/customerInterface'
import { TableCell, TableRow } from '../ui/table'
import { Link } from 'react-router-dom'

export default function Customer({
    customer,
}: {
    customer: ICustomerInterface
}) {
    const { customerId, customerName, customerEmail, customerAddress } =
        customer

    return (
        <TableRow>
            <TableCell className="border border-black text-center">
                {customerId}
            </TableCell>
            <TableCell className="border border-black">
                {customerName}
            </TableCell>
            <TableCell className="border border-black">
                {customerEmail}
            </TableCell>
            <TableCell className="border border-black">
                {customerAddress}
            </TableCell>
            <TableCell className="border border-black text-center">
                <Link
                    to={`/invoices/${customerId}`}
                    className="text-blue-500 underline"
                >
                    View
                </Link>
            </TableCell>
        </TableRow>
    )
}
