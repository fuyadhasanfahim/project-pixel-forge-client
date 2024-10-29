import { PlusIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { TimePicker } from '../TimePicker'
import {
    usePostOrderMutation,
    useUploadFilesMutation,
} from '@/features/orders/orderApi'
import { servicesData, outputFormatOptions } from '@/data/addOrder'
import { Checkbox } from '../ui/checkbox'

export default function AddOrderForm() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id, username } = user as IUser

    const [selectedServices, setSelectedServices] = useState<
        Record<string, boolean>
    >({})
    const [complexities, setComplexities] = useState<Record<string, string>>({})
    const [additionalInstructions, setAdditionalInstructions] =
        useState<string>('')
    const [outputFormat, setOutputFormat] = useState<string>('')
    const [files, setFiles] = useState<File[]>([])
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState<{ hour: string; minute: string }>({
        hour: '00',
        minute: '00',
    })
    const [deliveryDate, setDeliveryDate] = useState<Date | null>(null)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const [uploadFiles] = useUploadFilesMutation()
    const [postOrder, { isLoading }] = usePostOrderMutation()

    useEffect(() => {
        if (date && time) {
            const newDeliveryDate = new Date(date)
            newDeliveryDate.setHours(parseInt(time.hour, 10))
            newDeliveryDate.setMinutes(parseInt(time.minute, 10))
            setDeliveryDate(newDeliveryDate)
        }
    }, [date, time])

    const handleFileUpload = (files: FileList) => {
        setFiles(Array.from(files))
    }

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

        if (!files.length) {
            toast.error('Please upload at least one file.')
            return
        }

        const formData = new FormData()
        formData.append('username', username)
        formData.append(
            'services',
            JSON.stringify(
                Object.keys(selectedServices).filter(
                    (service) => selectedServices[service],
                ),
            ),
        )

        const complexitiesArray = Object.entries(complexities).map(
            ([, complexity]) => complexity,
        )

        formData.append('complexities', JSON.stringify(complexitiesArray))
        files.forEach((file) => formData.append('images', file))

        toast
            .promise(
                (async () => {
                    const response = await uploadFiles({
                        body: formData,
                        onProgress: setUploadProgress,
                    }).unwrap()

                    if (response?.folderUrl) {
                        const orderData = {
                            userId: _id,
                            username,
                            services: Object.keys(selectedServices).filter(
                                (service) => selectedServices[service],
                            ),
                            complexities,
                            additionalInstructions,
                            outputFormat,
                            deliveryDate,
                            folderUrl: response.folderUrl,
                            images: files.length,
                        }
                        await postOrder(orderData).unwrap()
                    }
                    return 'Order placed successfully.'
                })(),
                {
                    loading: 'Uploading files...',
                    success: (message) => message,
                    error: (error) => (error as Error).message,
                },
            )
            .catch((error) => {
                toast.error((error as Error).message)
            })
    }

    return (
        <div className="space-y-6 border rounded-xl p-10 shadow-lg m-4">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    Place Your Order
                </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <h3 className="mb-6 text-lg font-semibold">
                        Select Services
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
                        {servicesData.map((serviceOption) => (
                            <div
                                key={serviceOption.name}
                                className="flex flex-col"
                            >
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id={serviceOption.name}
                                        checked={Boolean(
                                            selectedServices[
                                                serviceOption.name
                                            ],
                                        )}
                                        onCheckedChange={() =>
                                            handleServiceChange(
                                                serviceOption.name,
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor={serviceOption.name}
                                        className="text-md font-medium text-gray-800"
                                    >
                                        {serviceOption.name}
                                    </label>
                                </div>
                                {selectedServices[serviceOption.name] && (
                                    <div className="mt-2">
                                        <Select
                                            onValueChange={(value) =>
                                                handleComplexityChange(
                                                    serviceOption.name,
                                                    value,
                                                )
                                            }
                                            required
                                        >
                                            <SelectTrigger className="w-full border rounded-md">
                                                <SelectValue placeholder="Select Complexity" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Complexity
                                                    </SelectLabel>
                                                    {serviceOption.complexities.map(
                                                        (complexityOption) => (
                                                            <SelectItem
                                                                key={
                                                                    complexityOption.label
                                                                }
                                                                value={
                                                                    complexityOption.label
                                                                }
                                                            >
                                                                {
                                                                    complexityOption.label
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid w-full max-w-full space-y-2">
                    <Label htmlFor="message" className="text-lg">
                        Additional Instructions
                    </Label>
                    <Textarea
                        id="message"
                        value={additionalInstructions}
                        onChange={(e) =>
                            setAdditionalInstructions(e.target.value)
                        }
                        placeholder="Add any details about your order..."
                        className="resize-none h-32"
                        required
                    />
                </div>

                <div className="flex items-center flex-wrap gap-5">
                    <div className="flex flex-col">
                        <h3 className="mb-3 text-lg">Choose Output Format</h3>
                        <Select onValueChange={setOutputFormat} required>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select an Image Format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Image Formats</SelectLabel>
                                    {outputFormatOptions.map((format) => (
                                        <SelectItem key={format} value={format}>
                                            {format}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="mb-3 text-lg">Choose Delivery Date</h3>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-[280px] justify-start text-left font-normal',
                                        !date && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    fromDate={new Date()}
                                    initialFocus
                                    required
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div>
                        <h3 className="mb-3 text-lg">Choose Delivery Time</h3>
                        <TimePicker setTime={setTime} />
                    </div>
                </div>

                <div className="grid w-full max-w-full space-y-2">
                    <Label htmlFor="file-upload" className="text-lg">
                        Upload Image
                    </Label>
                    <div className="flex items-center justify-center h-20 border-2 border-dashed rounded-lg border-gray-300">
                        <label
                            htmlFor="file"
                            className="p-6 flex flex-col items-center justify-center cursor-pointer"
                        >
                            <PlusIcon className="h-6 w-6" />
                            <span className="text-sm text-gray-600">
                                Click to upload
                            </span>
                            <Input
                                type="file"
                                id="file"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    handleFileUpload(e.target.files!)
                                }
                                className="hidden"
                                required
                            />
                        </label>
                    </div>
                    {files.length > 0 && (
                        <p className="text-sm text-gray-600">
                            {files.length === 0
                                ? 'No file selected'
                                : `${files.length} ${files.length > 1 ? 'files' : 'file'} selected`}
                        </p>
                    )}

                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full mt-2">
                            <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting Order...' : 'Submit Order'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
