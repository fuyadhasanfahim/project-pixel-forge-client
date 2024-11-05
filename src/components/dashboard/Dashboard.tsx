import { useFetchAllOrdersQuery } from '@/features/orders/orderApi'
import IOrders from '@/types/orderInterface'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'

export default function AdminDashboard() {
    const {
        data: ordersData,
        isLoading: ordersLoading,
        error: ordersError,
    } = useFetchAllOrdersQuery([])
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.auth)
    const { role } = user as IUser

    const orders = ordersData?.orders || []

    if (ordersError) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Error loading data.</p>
            </div>
        )
    }

    if (ordersLoading) {
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

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'text-yellow-500 bg-yellow-100'
            case 'canceled':
                return 'text-red-500 bg-red-100'
            case 'request for additional information':
                return 'text-blue-500 bg-blue-100'
            case 'completed':
                return 'text-green-500 bg-green-100'
            case 'inprogress':
                return 'text-blue-500 bg-blue-100'
            case 'delivered':
                return 'text-purple-500 bg-purple-100'
            default:
                return 'text-gray-500 bg-gray-100'
        }
    }

    return (
        <main className="p-6">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-6">
                {orders.length > 0 &&
                    orders.map((order: IOrders, index: number) => {
                        const {
                            customerId,
                            deliveryDate,
                            images,
                            totalPrice,
                            status,
                            services,
                            invoiceNumber,
                        } = order as IOrders

                        return (
                            <div
                                key={index}
                                className="bg-white p-6 ring-1 ring-gray-500/5 rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300 ease-in-out"
                            >
                                <div className="flex flex-col gap-4">
                                    {/* Customer Id */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm text-gray-500 font-medium">
                                            Customer Id
                                        </h2>
                                        <p className="text-base font-semibold text-gray-700">
                                            {customerId}
                                        </p>
                                    </div>

                                    {/* Delivery Date */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm text-gray-500 font-medium">
                                            Delivery Date
                                        </h2>
                                        <p className="text-base font-semibold text-gray-700">
                                            {new Date(
                                                deliveryDate,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Images */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm text-gray-500 font-medium">
                                            Images
                                        </h2>
                                        <p className="text-base font-semibold text-gray-700">
                                            {images}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm text-gray-500 font-medium">
                                            Total Price
                                        </h2>
                                        <p className="text-lg font-bold text-green-600">
                                            ${totalPrice}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm text-gray-500 font-medium">
                                            Status
                                        </h2>
                                        <p
                                            className={`text-sm font-semibold ${getStatusColor(
                                                order.status,
                                            )} px-3 py-1 rounded-full bg-opacity-20`}
                                        >
                                            {status}
                                        </p>
                                    </div>

                                    {/* Services */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm text-gray-500 font-medium">
                                            Services
                                        </h2>
                                        <p className="text-base font-semibold text-gray-700">
                                            {services.join(', ')}
                                        </p>
                                    </div>

                                    {/* Invoice Number */}
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-sm text-gray-500 font-medium">
                                            Invoice Number
                                        </h2>
                                        <p className="text-base font-semibold text-gray-700">
                                            {invoiceNumber}
                                        </p>
                                    </div>

                                    {(role === 'user' ||
                                        role === 'admin' ||
                                        role === 'superAdmin') && (
                                        <Button
                                            className="underline"
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/view-order-info/${order._id}`,
                                                )
                                            }
                                        >
                                            View
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </main>
    )
}
