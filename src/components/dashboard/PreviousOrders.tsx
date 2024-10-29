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
                return 'text-green-500'
            case 'canceled':
                return 'text-red-500'
            case 'request for additional information':
                return 'text-red-500'
            case 'completed':
                return 'text-yellow-500'
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
                <h1 className="text-lg font-semibold md:text-2xl">
                    Previous Orders
                </h1>
            </div>
            <Table className="border rounded-md">
                <TableCaption className="mb-3">
                    A list of your recent invoices.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Services</TableHead>
                        <TableHead>Complexities</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order: IOrders) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-medium">
                                {order._id}
                            </TableCell>
                            <TableCell>{order.username}</TableCell>
                            <TableCell>
                                {order.services.length > 0
                                    ? order.services.join(', ')
                                    : 'No services available'}{' '}
                            </TableCell>
                            <TableCell>
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
                            <TableCell>
                                {new Date(
                                    order.deliveryDate,
                                ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`font-semibold ${getStatusColor(order.status)}`}
                                >
                                    {order.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    )
}
