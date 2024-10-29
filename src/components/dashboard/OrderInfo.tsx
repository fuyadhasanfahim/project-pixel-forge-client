import {
    useFetchOrderByOrderIdQuery,
    useUpdateOrderMutation,
} from '@/features/orders/orderApi'
import { useParams } from 'react-router-dom'
import { Alert } from '../ui/alert'
import { useFetchUserByIdQuery } from '@/features/auth/authApi'
import { Button } from '../ui/button'
import { useRef, useState } from 'react'
import { Textarea } from '../ui/textarea'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { toast } from 'react-hot-toast'
import { FolderUp } from 'lucide-react'
import IUser from '@/types/userInterface'
import { servicesData } from '@/data/addOrder'
import IOrders from '@/types/orderInterface'

export default function OrderInfo() {
    const { user: loggedInUser } = useSelector((state: RootState) => state.auth)
    const { orderId } = useParams<{ orderId: string }>()
    const { data, isLoading, error } = useFetchOrderByOrderIdQuery(orderId)
    const { data: user } = useFetchUserByIdQuery(data?.order?.userId)
    const [reply, setReply] = useState(false)
    const order = data?.order
    const [updateOrder] = useUpdateOrderMutation()
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const { role } = loggedInUser as IUser

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-500'
            case 'canceled':
                return 'text-red-500'
            case 'completed':
                return 'text-green-500'
            case 'inprogress':
                return 'text-blue-500'
            default:
                return 'text-gray-500'
        }
    }

    const handleReply = () => {
        if (order?.status === 'pending') {
            toast.error(
                'Cannot reply to a pending order. Change the status first.',
            )
            return
        }
        setReply(!reply)
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            console.log('Selected files:', files)
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <Alert>
                <p>Failed to load order details. Please try again later.</p>
            </Alert>
        )
    }

    const calculateOrderPrice = (order: IOrders) => {
        const totalServicePrice = order.services.reduce((total, service) => {
            const foundService = servicesData.find((s) => s.name === service)

            if (foundService) {
                const complexity = order.complexities[service]
                if (complexity) {
                    const complexityData = foundService.complexities.find((c) =>
                        c.label.includes(complexity),
                    )

                    if (complexityData) {
                        const priceMatch = complexityData.label.match(/\d+/)
                        const complexityPrice = priceMatch
                            ? parseInt(priceMatch[0])
                            : 0

                        return total + complexityPrice
                    }
                }
            }

            return total
        }, 0)

        return totalServicePrice * Number(order.images)
    }

    return (
        <div className="p-6 space-y-6 w-full max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold">Order Details</h1>

            <div
                className={`border rounded-lg shadow transition-all duration-500 h-auto`}
            >
                <div className="bg-green-500 text-white py-3 px-6 rounded-t-lg flex justify-between items-center">
                    <h3>Order ID: {order?._id}</h3>
                    <img
                        src={user?.user?.profileImage}
                        alt="profile"
                        className="h-8 w-8 rounded-full ring ring-white"
                    />
                </div>

                <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-10 flex-wrap">
                            <div>
                                <strong>User ID:</strong> {order?.userId}
                            </div>
                            <div>
                                <strong>User Name:</strong> {user?.user?.name}
                            </div>
                        </div>

                        <div>
                            {role === 'user' ? (
                                <div className="flex items-center gap-5">
                                    <Button
                                        variant={'outline'}
                                        disabled={order?.status !== 'delivered'}
                                        onClick={async () =>
                                            await updateOrder({
                                                orderId,
                                                updateData: {
                                                    status: 'completed',
                                                },
                                            })
                                        }
                                    >
                                        {order?.status === 'completed'
                                            ? 'Accepted'
                                            : 'Accept'}
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        disabled={order?.status !== 'delivered'}
                                        onClick={async () =>
                                            await updateOrder({
                                                orderId,
                                                updateData: {
                                                    status: 'revision',
                                                },
                                            })
                                        }
                                    >
                                        Send to revision
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {order?.status === 'pending' ? (
                                        <Button
                                            variant={'outline'}
                                            onClick={async () =>
                                                await updateOrder({
                                                    orderId,
                                                    updateData: {
                                                        status: 'inprogress',
                                                    },
                                                })
                                            }
                                        >
                                            Accept Order
                                        </Button>
                                    ) : order?.status === 'delivered' ? (
                                        <Button
                                            variant={'outline'}
                                            className={'cursor-not-allowed'}
                                        >
                                            Delivered
                                        </Button>
                                    ) : (
                                        <Button
                                            variant={'outline'}
                                            onClick={async () =>
                                                await updateOrder({
                                                    orderId,
                                                    updateData: {
                                                        status: 'delivered',
                                                    },
                                                })
                                            }
                                        >
                                            Deliver Order
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-5 flex-wrap">
                        <div>
                            <strong>Status:</strong>{' '}
                            <span className={getStatusColor(order?.status)}>
                                {order?.status}
                            </span>
                        </div>
                        <div>
                            <strong>Delivery Date:</strong>{' '}
                            {new Date(order?.deliveryDate).toLocaleDateString()}
                        </div>
                        <div>
                            <strong>Images:</strong> {order?.images}
                        </div>
                        <div>
                            <strong>Price:</strong> $
                            {calculateOrderPrice(order)}
                        </div>
                        <div>
                            <strong>Payment Status:</strong>{' '}
                            <span
                                className={
                                    order?.status === 'completed'
                                        ? 'text-yellow-500'
                                        : 'text-black'
                                }
                            >
                                {order?.paymentStatus || 'N/A'}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-5 flex-wrap">
                        <div>
                            <strong>Output Format:</strong>{' '}
                            {order?.outputFormat}
                        </div>
                        <div>
                            <strong>Services:</strong>{' '}
                            {order?.services.length > 0
                                ? order.services.join(', ')
                                : 'No services available'}
                        </div>
                        <div>
                            <strong>Complexities:</strong>
                            <ul className="ml-6 list-disc">
                                {order?.complexities &&
                                    Object.entries(order.complexities).map(
                                        ([key, value]) => (
                                            <li key={key}>
                                                {key}: {value as string}
                                            </li>
                                        ),
                                    )}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <strong>Additional Instructions:</strong>{' '}
                        {order?.additionalInstructions || 'None'}
                    </div>

                    <div className="flex justify-between items-center flex-wrap gap-5">
                        <div>
                            <strong>Order Submitted by:</strong>{' '}
                            {order?.username}
                        </div>

                        <Button onClick={handleReply}>
                            {reply ? 'Cancel Reply' : 'Reply'}
                        </Button>
                    </div>

                    {reply && (
                        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                            <Textarea
                                className="w-full"
                                placeholder="Write your reply..."
                            />
                            <div className="flex items-center gap-5 mt-2">
                                <Button>Send Reply</Button>
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        variant={'outline'}
                                        onClick={handleClick}
                                        className="flex items-center gap-2"
                                    >
                                        <FolderUp className="w-5 h-5" />
                                        Update Images
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
