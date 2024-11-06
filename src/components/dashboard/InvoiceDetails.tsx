import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetOrdersByCustomerIdMutation } from '@/features/orders/orderApi'
import IOrder from '@/types/orderInterface'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'

export default function InvoiceDetails() {
    const { customerId } = useParams<{ customerId: string }>()
    const [getOrdersByCustomerId, { data, isLoading }] =
        useGetOrdersByCustomerIdMutation()
    const navigate = useNavigate()

    const { orders } = data || { orders: [] }

    useEffect(() => {
        if (customerId) {
            getOrdersByCustomerId(customerId)
        }
    }, [customerId, getOrdersByCustomerId])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading orders...
            </div>
        )
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Invoice Details
                </h1>

                <Button
                    onClick={() => navigate(`/invoices/download/${customerId}`)}
                >
                    Get Invoice
                </Button>
            </div>
            <Table>
                <TableCaption>
                    A list of orders for customer ID: {customerId}
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                            Date
                        </TableHead>
                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                            Services
                        </TableHead>
                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                            Description
                        </TableHead>
                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                            Images
                        </TableHead>
                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                            Price/Image
                        </TableHead>
                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order: IOrder) => {
                        const totalAmount =
                            Number(order.images) *
                            parseFloat(order.pricePerImage || '0')
                        return (
                            <TableRow key={order._id}>
                                <TableCell className="border border-black">
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="border border-black">
                                    {order.services.join(', ')}
                                </TableCell>
                                <TableCell className="border border-black">
                                    {order.instructions}
                                </TableCell>
                                <TableCell className="border border-black">
                                    {order.images}
                                </TableCell>
                                <TableCell className="border border-black">
                                    ${order.pricePerImage}
                                </TableCell>
                                <TableCell className="border border-black">
                                    ${totalAmount.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell
                            colSpan={12}
                            className="text-right font-medium"
                        >
                            Total Orders: {orders.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
