import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrdersByCustomerIdMutation } from '@/features/orders/orderApi'
import IOrder from '@/types/orderInterface'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import LogoImage from '@/assets/images/logo.png'
import { Button } from '../ui/button'
import { useGetCustomerByCustomerIdQuery } from '@/features/customer/customerApi'
import { DateRange } from 'react-day-picker'
import { format, isWithinInterval } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useReactToPrint } from 'react-to-print'

export default function InvoiceDetailsPDF() {
    const { customerId } = useParams<{ customerId: string }>()
    const [getOrdersByCustomerId, { data: ordersData, isLoading }] =
        useGetOrdersByCustomerIdMutation()
    const { data: customerData } = useGetCustomerByCustomerIdQuery(customerId)
    const [date, setDate] = useState<DateRange | undefined>(undefined)
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([])

    const orders = ordersData?.orders || []
    const customer = customerData?.customer || {}
    const componentRef = useRef(null)
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    })

    useEffect(() => {
        if (customerId) {
            getOrdersByCustomerId(customerId)
        }
    }, [customerId, getOrdersByCustomerId])

    const handleGenerateClick = () => {
        if (date?.from && date?.to) {
            const from = new Date(date.from)
            const to = new Date(date.to)

            const filtered = orders.filter((order: IOrder) => {
                const orderDate = new Date(order.createdAt)
                return isWithinInterval(orderDate, { start: from, end: to })
            })
            setFilteredOrders(filtered)
        } else {
            console.log('Please select a valid date range')
            setFilteredOrders([])
        }
    }

    const totalAmount = filteredOrders.reduce((sum: number, order: IOrder) => {
        const orderTotal =
            Number(order.images) * parseFloat(order.pricePerImage || '0')
        return sum + orderTotal
    }, 0)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-dvh">
                Loading orders...
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-dvh">
                No Order found.
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto py-10">
            <div className="flex items-start justify-between w-full gap-5">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>
                            <CalendarIcon />
                            {date?.from ? (
                                date?.to ? (
                                    <>
                                        {format(date.from, 'LLL dd, y')} -{' '}
                                        {format(date.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(date.from, 'LLL dd, y')
                                )
                            ) : (
                                <span>Sort by Date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            selected={date}
                            onSelect={(range) => setDate(range)}
                            numberOfMonths={1}
                            className="border w-72 flex items-center justify-center rounded-lg"
                        />
                        <div className="flex items-center justify-center">
                            <Button
                                className="my-2 mx-auto"
                                onClick={handleGenerateClick}
                            >
                                Generate
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
                <Button
                    className="bg-green-500 hover:bg-green-100 hover:text-green-500 duration-200 transition-colors hover:border-green-500 border-2 border-transparent"
                    onClick={() => {
                        handlePrint()
                    }}
                    disabled={!date?.from || !date?.to} // Disable button if date is not selected
                >
                    Print
                </Button>
            </div>
            <br />

            {/* Conditional Rendering for Table */}
            {date?.from && date?.to && filteredOrders.length > 0 && (
                <div ref={componentRef} id="print-content">
                    <div>
                        <div className="mt-6 mb-6 flex items-center gap-10 justify-between">
                            <img
                                src={LogoImage}
                                alt="Logo"
                                className="h-12 w-fit"
                            />
                            <div className="px-4 text-lg">
                                <p>
                                    <strong>Address:</strong> Mastar Para,
                                    Gaibandha
                                </p>
                                <p>
                                    <strong>Mobile:</strong> 01795616264,
                                    01767201923
                                </p>
                            </div>
                        </div>
                        <br /> <br />
                        <div className="table-section mb-6">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead
                                            className="border border-black border-r-0 text-black text-start w-96"
                                            colSpan={8}
                                        >
                                            Bill To
                                        </TableHead>
                                        <TableHead
                                            className="border-t border-l border-black text-black text-start"
                                            colSpan={2}
                                        >
                                            Invoice Number
                                        </TableHead>
                                        <TableHead
                                            className="border border-black text-black"
                                            colSpan={2}
                                        >
                                            {orders[0]?.invoiceNumber}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell
                                            className="border border-black"
                                            rowSpan={2}
                                            colSpan={8}
                                        >
                                            {customer?.customerName}
                                        </TableCell>
                                        <TableCell
                                            className="border border-black text-start"
                                            colSpan={2}
                                        >
                                            Invoice Date
                                        </TableCell>
                                        <TableCell
                                            className="border border-black"
                                            colSpan={2}
                                        >
                                            {format(
                                                new Date(Date.now()),
                                                'dd/MM/yyyy',
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            className="border border-black"
                                            colSpan={2}
                                        >
                                            Delivery Date
                                        </TableCell>
                                        <TableCell
                                            className="border border-black"
                                            colSpan={2}
                                        >
                                            {format(
                                                new Date(
                                                    Date.now() +
                                                        3 * 24 * 60 * 60 * 1000,
                                                ),
                                                'dd/MM/yyyy',
                                            )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="table-section">
                            <Table>
                                <TableHeader>
                                    <TableRow className="header-row">
                                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                                            Date
                                        </TableHead>
                                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                                            Services
                                        </TableHead>
                                        <TableHead className="border border-black text-white bg-green-500 font-semibold">
                                            Complexity
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
                                    {filteredOrders.map((order: IOrder) => {
                                        const orderTotalAmount =
                                            Number(order.images) *
                                            parseFloat(
                                                order.pricePerImage || '0',
                                            )
                                        return (
                                            <TableRow key={order._id}>
                                                <TableCell className="border border-black">
                                                    {format(
                                                        new Date(
                                                            order.createdAt,
                                                        ),
                                                        'dd MMM yyyy',
                                                    )}
                                                </TableCell>
                                                <TableCell className="border border-black">
                                                    {order.services.join(', ')}
                                                </TableCell>
                                                <TableCell className="border border-black">
                                                    {
                                                        order.complexities[
                                                            order.services[0]
                                                        ]
                                                    }
                                                </TableCell>
                                                <TableCell className="border border-black">
                                                    {order.images}
                                                </TableCell>
                                                <TableCell className="border border-black">
                                                    ${order.pricePerImage}
                                                </TableCell>
                                                <TableCell className="border border-black">
                                                    $
                                                    {orderTotalAmount.toFixed(
                                                        2,
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                            <div className="w-full flex items-center justify-end py-4 px-2">
                                Total Amount: ${totalAmount.toFixed(2)}
                            </div>
                        </div>
                        <div className="my-6 flex items-center justify-between w-full">
                            <h3>Received by: {customer.customerName}</h3>
                            <h3>Authorized by: Md Ashaduzzaman</h3>
                        </div>
                        <div>
                            <p>
                                Time of Printing:{' '}
                                {format(new Date(Date.now()), 'dd/MM/yyyy')}
                            </p>
                            {date && (
                                <p>
                                    Orders between{' '}
                                    {date?.from &&
                                        date?.to &&
                                        `${format(date.from, 'LLL dd, y')} and ${format(date.to, 'LLL dd, y')}`}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
