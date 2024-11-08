import { RootState } from '@/app/store'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useFetchOrderByUserIdQuery } from '@/features/orders/orderApi'
import IOrders from '@/types/orderInterface'
import IUser from '@/types/userInterface'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function PreviousOrders() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id } = user as IUser
    const userId = _id
    const { data, isLoading } = useFetchOrderByUserIdQuery(userId)

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        )
    }

    const orders = data?.orders || []

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'text-yellow-500'
            case 'canceled':
                return 'text-red-500'
            case 'request for additional information':
                return 'text-violate-500'
            case 'completed':
                return 'text-green-500'
            case 'inprogress':
                return 'text-blue-500'
            case 'delivered':
                return 'text-purple-500'
            default:
                return 'text-gray-500'
        }
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
            </div>
            <Table className="border rounded-md">
                <TableCaption className="mb-3">
                    A list of your recent invoices.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="border border-black bg-green-500 text-white">
                            Invoice
                        </TableHead>
                        <TableHead className="border border-black bg-green-500 text-white">
                            Username
                        </TableHead>
                        <TableHead className="border border-black bg-green-500 text-white">
                            Services
                        </TableHead>
                        <TableHead className="border border-black bg-green-500 text-white">
                            Complexities
                        </TableHead>
                        <TableHead className="border border-black bg-green-500 text-white">
                            Delivery Date
                        </TableHead>
                        <TableHead className="border border-black bg-green-500 text-white">
                            Status
                        </TableHead>
                        <TableHead className="border border-black bg-green-500 text-white">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order: IOrders) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-medium border border-black">
                                {order.invoiceNumber}
                            </TableCell>
                            <TableCell className="border border-black">
                                {order.username}
                            </TableCell>
                            <TableCell className="border border-black">
                                {order.services.length > 0
                                    ? order.services.join(', ')
                                    : 'No services available'}{' '}
                            </TableCell>
                            <TableCell className="border border-black">
                                {order.complexities &&
                                Object.keys(order.complexities).length > 0
                                    ? Object.entries(order.complexities).map(
                                          ([key, value]) => (
                                              <div key={key}>
                                                  {key}: {value}
                                              </div>
                                          ),
                                      )
                                    : 'No complexities available'}
                            </TableCell>
                            <TableCell className="border border-black">
                                {new Date(
                                    order.deliveryDate,
                                ).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="border border-black">
                                <span
                                    className={`font-semibold ${getStatusColor(order.status)}`}
                                >
                                    {order.status}
                                </span>
                            </TableCell>
                            <TableCell className="border border-black">
                                <Link
                                    to={`/view-order-info/${order._id}`}
                                    className="text-blue-500 underline"
                                >
                                    View
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    )
}
