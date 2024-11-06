import { useEffect, useState } from 'react'
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
import { format, format as formatDate, isWithinInterval } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

export default function InvoiceDetailsPDF() {
    const { customerId } = useParams<{ customerId: string }>()
    const [getOrdersByCustomerId, { data: ordersData, isLoading }] =
        useGetOrdersByCustomerIdMutation()
    const { data: customerData } = useGetCustomerByCustomerIdQuery(customerId)
    const [date, setDate] = useState<DateRange | undefined>(undefined)

    const orders = ordersData?.orders || []
    const customer = customerData?.customer || {}

    useEffect(() => {
        if (customerId) {
            getOrdersByCustomerId(customerId)
        }
    }, [customerId, getOrdersByCustomerId])

    const filteredOrders = date
        ? orders.filter((order: IOrder) => {
              const orderDate = new Date(order.createdAt)
              return (
                  date.from &&
                  date.to &&
                  isWithinInterval(orderDate, {
                      start: date.from,
                      end: date.to,
                  })
              )
          })
        : orders

    const totalAmount = filteredOrders.reduce(
        (sum: number, order: { images: string; pricePerImage: string }) => {
            const orderTotal =
                Number(order.images) * parseFloat(order.pricePerImage || '0')
            return sum + orderTotal
        },
        0,
    )

    const handlePrint = () => {
        window.print()
    }

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
        <div className="p-6">
            <div className="flex items-start justify-between w-full gap-5">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button id="date">
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
                            onSelect={setDate}
                            numberOfMonths={1}
                            className="border w-72 flex items-center justify-center rounded-lg"
                        />
                    </PopoverContent>
                </Popover>

                <Button
                    className="bg-green-500 hover:bg-green-100 hover:text-green-500 duration-200 transition-colors hover:border-green-500 border-2 border-transparent"
                    onClick={handlePrint}
                    id="sidebar"
                >
                    Print
                </Button>
            </div>
            <br />

            <div id="print-content">
                <div className="mt-6 mb-6 flex items-center gap-10 justify-between">
                    <img src={LogoImage} alt="Logo" className=" w-64" />
                    <div className="px-4 text-lg">
                        <p>
                            <strong>Address:</strong> Mastar Para, Gaibandha
                        </p>
                        <p>
                            <strong>Mobile:</strong> 01795616264, 01767201923
                        </p>
                    </div>
                </div>
                <br /> <br />
                <div className="table-section mb-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="border border-black border-r-0 text-black">
                                    Bill To
                                </TableHead>
                                <TableHead className="border-t border-black text-black "></TableHead>
                                <TableHead className="border-t border-black text-black "></TableHead>
                                <TableHead className="border-t border-black text-black "></TableHead>
                                <TableHead className="border-t border-black text-black "></TableHead>
                                <TableHead className="border-t border-black text-black "></TableHead>
                                <TableHead className="border-t border-l border-black text-black ">
                                    Invoice Number
                                </TableHead>
                                <TableHead className="border border-black text-black">
                                    {orders[0]?.invoiceNumber}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    className="border border-black"
                                    rowSpan={2}
                                    colSpan={6}
                                >
                                    {customer?.customerName}
                                </TableCell>
                                <TableCell className="border border-black">
                                    Invoice Date
                                </TableCell>
                                <TableCell className="border border-black">
                                    {format(new Date(Date.now()), 'dd/MM/yyyy')}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className="border border-black"
                                    rowSpan={2}
                                >
                                    Delivery Date
                                </TableCell>
                                <TableCell
                                    className="border border-black"
                                    rowSpan={2}
                                ></TableCell>
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
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order: IOrder) => {
                                    const orderTotalAmount =
                                        Number(order.images) *
                                        parseFloat(order.pricePerImage || '0')
                                    return (
                                        <TableRow key={order._id}>
                                            <TableCell className="border border-black">
                                                {formatDate(
                                                    new Date(order.createdAt),
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
                                                ${orderTotalAmount.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center"
                                    >
                                        No orders found between{' '}
                                        {date?.from && date?.to
                                            ? `${format(date.from, 'LLL dd, y')} and ${format(date.to, 'LLL dd, y')}`
                                            : 'the selected dates.'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="w-full flex items-center justify-end py-4 px-2">
                        Total Amount: $
                        {filteredOrders.length > 0
                            ? totalAmount.toFixed(2)
                            : '0.00'}
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
    )
}
