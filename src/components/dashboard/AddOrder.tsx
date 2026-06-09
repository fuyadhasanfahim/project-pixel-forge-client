import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import toast from 'react-hot-toast'
import { usePostOrderMutation } from '@/features/orders/orderApi'
import SelectServiceAndComplexities from './add-order-props/SelectServiceAndComplexities'
import Instructions from './add-order-props/Instructions'
import OutputFormat from './add-order-props/OutputFormat'
import DeliveryDate from './add-order-props/DeliveryDate'
import { DeliveryTime } from './add-order-props/DeliveryTime'
import UploadFiles from './add-order-props/UploadFiles'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import Inputs from './add-order-props/Inputs'
import { Label } from '../ui/label'
import { useGetCustomersQuery } from '@/features/customer/customerApi'
import ICustomerInterface from '@/types/customerInterface'
import moment from 'moment'

function generateExpenseNumber() {
    return `INV-${moment().format('DDMMYYYYhhmm')}`
}

export default function AddOrderForm() {
    const {
        data,
        isLoading: customersLoading,
        error,
    } = useGetCustomersQuery([])
    const customers = (data?.customers as ICustomerInterface[]) || []

    const { user } = useSelector((state: RootState) => state.auth)
    const { _id, username, name, email, profileImage } = user as IUser

    const [selectedServices, setSelectedServices] = useState<
        Record<string, boolean>
    >({})
    const [complexities, setComplexities] = useState<Record<string, string>>({})
    const [instructions, setInstructions] = useState<string>('')
    const [outputFormat, setOutputFormat] = useState<string>('')
    const [files, setFiles] = useState<File[]>([])
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState<{ hour: string; minute: string }>({
        hour: '00',
        minute: '00',
    })
    const [deliveryDate, setDeliveryDate] = useState<Date | null>(null)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const [imagesLink, setImagesLink] = useState<string>('')
    const [orderName, setOrderName] = useState<string>('')
    const [images, setImages] = useState<string>('')
    const [pricePerImage, setPricePerImage] = useState<string>('')
    const [totalPrice, setTotalPrice] = useState<string>('')
    const [customerId, setCustomerId] = useState<string>('')
    const [invoiceNumber, setInvoiceNumber] = useState<string>(
        generateExpenseNumber(),
    )

    useEffect(() => {
        setInvoiceNumber(generateExpenseNumber())
    }, [])

    const [postOrder, { isLoading }] = usePostOrderMutation()

    useEffect(() => {
        if (date && time) {
            const newDeliveryDate = new Date(date)
            newDeliveryDate.setHours(parseInt(time.hour, 10))
            newDeliveryDate.setMinutes(parseInt(time.minute, 10))
            setDeliveryDate(newDeliveryDate)
        }
    }, [date, time])

    useEffect(() => {
        const price = Number(pricePerImage)
        const imageCount = Number(images)

        if (price > 0 && imageCount > 0) {
            setTotalPrice((price * imageCount).toString())
        } else {
            setTotalPrice('')
        }
    }, [pricePerImage, images])

    const handleServiceChange = (serviceName: string) => {
        setSelectedServices((prev) => ({
            ...prev,
            [serviceName]: !prev[serviceName],
        }))
        if (complexities[serviceName]) {
            setComplexities((prev) => ({ ...prev, [serviceName]: '' }))
        }
    }

    const handleComplexityChange = (
        serviceName: string,
        complexity: string,
    ) => {
        setComplexities((prev) => ({
            ...prev,
            [serviceName]: complexity,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const orderData = {
            invoiceNumber,
            userId: _id,
            username,
            name,
            email,
            profileImage,
            services: Object.keys(selectedServices).filter(
                (service) => selectedServices[service],
            ),
            complexities,
            instructions,
            outputFormat,
            deliveryDate,
            imagesLink,
            images,
            pricePerImage,
            totalPrice,
            customerId,
            orderName,
        }

        try {
            await postOrder(orderData).unwrap()
            toast.success('Order placed successfully.')

            setFiles([])
            setSelectedServices({})
            setComplexities({})
            setInstructions('')
            setOutputFormat('')
            setDeliveryDate(null)
            setUploadProgress(0)
            setImagesLink('')
            setOrderName('')
            setImages('')
            setPricePerImage('')
            setTotalPrice('')
            setCustomerId('')
            setInvoiceNumber(generateExpenseNumber())
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <div className="space-y-6 border rounded-xl p-10 shadow-lg m-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Place Your Order
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <UploadFiles files={files} uploadProgress={uploadProgress} />

                <Inputs
                    type={'text'}
                    id={'folder-name'}
                    placeholder={'Enter order name or folder name here'}
                    readOnly={false}
                    label={'Order Name/ Folder Name'}
                    value={orderName}
                    setValue={setOrderName}
                />

                <SelectServiceAndComplexities
                    handleServiceChange={handleServiceChange}
                    handleComplexityChange={handleComplexityChange}
                    selectedServices={selectedServices}
                />

                <div className="flex items-center flex-wrap gap-5 w-full">
                    <Inputs
                        type={'text'}
                        id={'imageLinks'}
                        placeholder={'Enter Image Links'}
                        readOnly={false}
                        label={'Image Link'}
                        value={imagesLink}
                        setValue={setImagesLink}
                    />
                    <Inputs
                        type={'number'}
                        id={'images'}
                        placeholder={'Enter total images'}
                        readOnly={false}
                        label={'Images'}
                        value={images}
                        setValue={setImages}
                    />
                    <Inputs
                        type={'number'}
                        id={'price-per-image'}
                        placeholder={'Enter per image price'}
                        readOnly={false}
                        label={'Price per image'}
                        value={pricePerImage}
                        setValue={setPricePerImage}
                    />
                    <Inputs
                        type={'number'}
                        id={'total-price'}
                        placeholder={'Your total price'}
                        readOnly={true}
                        label={'Total price'}
                        value={totalPrice}
                        setValue={setTotalPrice}
                    />

                    <div>
                        <Label
                            htmlFor="customerSelect"
                            className="block text-lg"
                        >
                            Customer ID
                        </Label>
                        <Select onValueChange={(value) => setCustomerId(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Customer ID" />
                            </SelectTrigger>
                            <SelectContent id="customerSelect">
                                {customersLoading ? (
                                    <SelectItem value="loading" disabled>
                                        Loading customers...
                                    </SelectItem>
                                ) : error ? (
                                    <SelectItem value="error" disabled>
                                        Error fetching customers
                                    </SelectItem>
                                ) : customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <SelectItem
                                            key={customer.customerId}
                                            value={customer.customerId}
                                        >
                                            {customer.customerId}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-customers" disabled>
                                        No customers found
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center flex-wrap gap-5">
                    <OutputFormat setOutputFormat={setOutputFormat} />
                    <DeliveryDate date={date} setDate={setDate} />
                    <DeliveryTime setTime={setTime} />
                </div>

                <Instructions
                    instructions={instructions}
                    setInstructions={setInstructions}
                />

                <div className="flex justify-center">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting Order...' : 'Submit Order'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
