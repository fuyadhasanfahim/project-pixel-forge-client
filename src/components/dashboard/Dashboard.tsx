import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useGetCustomersQuery } from '@/features/customer/customerApi'
import { useFetchAllOrdersQuery } from '@/features/orders/orderApi'
import IOrders from '@/types/orderInterface'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
    const {
        data: ordersData,
        isLoading: ordersLoading,
        error: ordersError,
    } = useFetchAllOrdersQuery([])
    const {
        data: customersData,
        isLoading: customersLoading,
        error: customersError,
    } = useGetCustomersQuery([])
    const navigate = useNavigate()

    const orders = ordersData?.orders || []
    const customers = customersData?.customers || []

    // Map customerId to customer name
    const customerNameMap = customers.reduce(
        (
            acc: Record<string, string>,
            customer: { customerId: string; customerName: string },
        ) => {
            acc[customer.customerId] = customer.customerName
            return acc
        },
        {},
    )

    if (ordersError || customersError) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Error loading data.</p>
            </div>
        )
    }

    if (ordersLoading || customersLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                No orders found
            </div>
        )
    }

    const topSectionOrders = orders.filter((order: IOrders) =>
        [
            'pending',
            'request for additional information',
            'inprogress',
        ].includes(order.status),
    )
    const canceledOrders = orders.filter(
        (order: IOrders) => order.status === 'canceled',
    )
    const completedOrders = orders.filter(
        (order: IOrders) => order.status === 'completed',
    )

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'bg-[#ffe5a0]'
            case 'canceled':
                return 'bg-[#b10202]'
            case 'request for additional information':
                return 'bg-[#b10202]'
            case 'completed':
                return 'bg-[#11734b]'
            case 'inprogress':
                return 'bg-[#0a53a8] text-white'
            case 'delivered':
                return 'bg-purple-500'
            default:
                return 'bg-gray-500'
        }
    }

    const renderPaymentStatus = (order: IOrders) => (
        <span
            className={
                order.paymentStatus === 'paid'
                    ? 'text-green-500'
                    : 'text-red-500'
            }
        >
            {order.paymentStatus}
        </span>
    )

    const renderOrders = (
        orders: IOrders[],
        showPaymentStatus: boolean = false,
    ) => {
        return orders.map((order: IOrders, index: number) => {
            const customerName = customerNameMap[order.customerId] || 'N/A'
            return (
                <TableRow
                    key={index}
                    className={`${getStatusColor(order.status)}`}
                >
                    <TableCell className="border border-black">
                        {new Date(order.deliveryDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium border border-black w-60">
                        {order.invoiceNumber}
                    </TableCell>
                    <TableCell className="border border-black">
                        {customerName}
                    </TableCell>
                    <TableCell className="border border-black">
                        {order?.services?.length > 0
                            ? order.services.join(', ')
                            : 'No services available'}{' '}
                    </TableCell>
                    <TableCell className="border border-black">
                        {order?.images || 0}
                    </TableCell>
                    <TableCell className="border border-black">
                        $ {order?.totalPrice || 0}
                    </TableCell>
                    <TableCell className="border border-black">
                        <span className={`font-semibold uppercase`}>
                            {order.status}
                        </span>
                    </TableCell>
                    {showPaymentStatus && (
                        <TableCell className="uppercase border border-black">
                            {renderPaymentStatus(order)}
                        </TableCell>
                    )}
                    <TableCell className="border border-black">
                        <button
                            className="underline"
                            onClick={() =>
                                navigate(
                                    `/dashboard/view-order-info/${order._id}`,
                                )
                            }
                        >
                            View
                        </button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 space-y-4">
            {topSectionOrders.length > 0 ? (
                <div>
                    <Table className="border rounded-md">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Delivery Date</TableHead>
                                <TableHead>Invoice Number</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Services</TableHead>
                                <TableHead>Images</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Info</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{renderOrders(topSectionOrders)}</TableBody>
                    </Table>
                </div>
            ) : (
                <div>No Orders Available</div>
            )}

            {completedOrders.length > 0 && (
                <Table className="border rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Delivery Date</TableHead>
                            <TableHead>Invoice no.</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Services</TableHead>
                            <TableHead>Images</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>Info</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-white bg-green-700">
                        {renderOrders(completedOrders, true)}
                    </TableBody>
                </Table>
            )}

            {canceledOrders.length > 0 && (
                <Table className="border rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Delivery Date</TableHead>
                            <TableHead>Invoice no.</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Services</TableHead>
                            <TableHead>Images</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Info</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-white bg-red-700">
                        {renderOrders(canceledOrders)}
                    </TableBody>
                </Table>
            )}
        </main>
    )
}
