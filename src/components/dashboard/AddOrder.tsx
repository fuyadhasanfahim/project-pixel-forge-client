import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import toast from 'react-hot-toast'
import {
    usePostOrderMutation,
    useUploadFilesMutation,
} from '@/features/orders/orderApi'
import SelectServiceAndComplexities from './add-order-props/SelectServiceAndComplexities'
import Instructions from './add-order-props/Instructions'
import OutputFormat from './add-order-props/OutputFormat'
import DeliveryDate from './add-order-props/DeliveryDate'
import { DeliveryTime } from './add-order-props/DeliveryTime'
import UploadFiles from './add-order-props/UploadFiles'

export default function AddOrderForm() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id, username } = user as IUser

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
    const [uploading, setUploading] = useState<boolean>(false)
    const [folderUrl, setFolderUrl] = useState<string>('')
    const [imageUrls, setImageUrls] = useState<string[]>([])

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

    const handleFileUpload = async (newFiles: File[]) => {
        setFiles(newFiles)
        setUploading(true)

        const formData = new FormData()
        formData.append('username', username)
        newFiles.forEach((file) => formData.append('images', file))

        toast
            .promise(
                (async () => {
                    const response = await uploadFiles({
                        body: formData,
                        onProgress: setUploadProgress,
                    }).unwrap()

                    if (response?.folderUrl && response?.imageUrls) {
                        setFolderUrl(response.folderUrl)
                        setImageUrls(response?.imageUrls)
                        return 'Files uploaded successfully.'
                    } else {
                        throw new Error('Failed to upload files.')
                    }
                })(),
                {
                    loading: 'Uploading files...',
                    success: () => {
                        setUploadProgress(0)
                        return 'Files uploaded successfully.'
                    },
                    error: (error) => {
                        return (error as Error).message
                    },
                },
            )
            .finally(() => {
                setUploading(false)
            })
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

        if (!folderUrl) {
            toast.error('Please upload files first.')
            return
        }

        const orderData = {
            userId: _id,
            username,
            services: Object.keys(selectedServices).filter(
                (service) => selectedServices[service],
            ),
            complexities,
            instructions,
            outputFormat,
            deliveryDate,
            folderUrl,
            images: files.length,
            imageUrls,
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
            setFolderUrl('')
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
                <UploadFiles
                    handleFileUpload={handleFileUpload}
                    files={files}
                    uploadProgress={uploadProgress}
                />

                <SelectServiceAndComplexities
                    handleServiceChange={handleServiceChange}
                    handleComplexityChange={handleComplexityChange}
                    selectedServices={selectedServices}
                />

                <Instructions
                    instructions={instructions}
                    setInstructions={setInstructions}
                />

                <div className="flex items-center flex-wrap gap-5">
                    <OutputFormat setOutputFormat={setOutputFormat} />

                    <DeliveryDate date={date} setDate={setDate} />

                    <DeliveryTime setTime={setTime} />
                </div>

                <div className="flex justify-center">
                    <Button type="submit" disabled={isLoading || uploading}>
                        {isLoading || uploading
                            ? 'Submitting Order...'
                            : 'Submit Order'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
