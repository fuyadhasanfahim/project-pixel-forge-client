import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetOrdersByCustomerIdMutation } from '@/features/orders/orderApi'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import IOrder from '@/types/orderInterface'

export default function InvoiceDetails() {
    const { customerId } = useParams()
    const [getOrdersByCustomerId, { data, isLoading }] =
        useGetOrdersByCustomerIdMutation()

    const { orders } = data || []

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
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                Invoice Details
            </h1>
            <div className="flex flex-wrap gap-6">
                {orders?.map((order: IOrder) => {
                    const totalAmount =
                        Number(order.images) *
                        parseFloat(order.pricePerImage || '0')

                    return (
                        <Card
                            key={order._id}
                            className="shadow-lg p-4 rounded-lg"
                        >
                            <CardHeader>
                                <CardTitle>
                                    Order #{order.invoiceNumber}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    <strong>Customer Name:</strong> {order.name}{' '}
                                    ({order.username})
                                </p>
                                <p>
                                    <strong>Email:</strong> {order.email}
                                </p>
                                <p>
                                    <strong>Delivery Date:</strong>{' '}
                                    {new Date(
                                        order.deliveryDate,
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Services:</strong>{' '}
                                    {order.services.join(', ')}
                                </p>
                                <p>
                                    <strong>Complexity:</strong>{' '}
                                    {order.complexities[order.services[0]]}
                                </p>
                                <p>
                                    <strong>Total Images:</strong>{' '}
                                    {order.images}
                                </p>
                                <p>
                                    <strong>Price Per Image:</strong> $
                                    {order.pricePerImage}
                                </p>
                                <p>
                                    <strong>Total Amount:</strong> $
                                    {totalAmount.toFixed(2)}
                                </p>
                                <p>
                                    <strong>Status:</strong> {order.status}
                                </p>
                                <p>
                                    <strong>Payment Status:</strong>{' '}
                                    {order.paymentStatus}
                                </p>
                                <p>
                                    <strong>Instructions:</strong>{' '}
                                    {order.instructions}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Link
                                    to={`/invoices/download/${order?.customerId}`}
                                >
                                    <Button>Get Invoice</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
