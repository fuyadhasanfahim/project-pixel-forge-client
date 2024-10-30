import { Input } from '@/components/ui/input'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { IUploadFilesProps } from './interface/IAddOrderProps'
import { Button } from '@/components/ui/button'
import ImagePopOver from './ImagePopOver'

export default function UploadFiles({
    handleFileUpload,
    files,
    uploadProgress,
    imageUrls,
}: IUploadFilesProps) {
    // const [popoverOpen, setPopoverOpen] = useState(false)

    return (
        <div className="grid w-full max-w-full space-y-2">
            <h3 className="mb-6 text-lg font-semibold">Upload Image</h3>
            <div className="border-2 border-dashed rounded-lg border-gray-300 p-6">
                <div className="flex flex-col items-center justify-center">
                    <label
                        htmlFor="file"
                        className="flex flex-col items-center cursor-pointer"
                    >
                        <PlusIcon className="h-8 w-8 text-gray-400 hover:text-gray-600 transition" />
                        <span className="text-sm text-gray-600 mt-1">
                            Click to upload
                        </span>
                        <Input
                            type="file"
                            id="file"
                            accept="image/*"
                            multiple
                            onChange={(e) =>
                                handleFileUpload(
                                    Array.from(e.target.files || []),
                                )
                            }
                            className="hidden"
                            required
                        />
                    </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-x-4 mt-4 w-full max-w-xl">
                    {imageUrls.slice(0, 5).map((imageUrl, index) => (
                        <div key={index} className="relative group w-20">
                            <img
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className="w-20 h-20 rounded-lg object-cover transition-transform transform group-hover:scale-105"
                            />
                            <Button
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                variant={'outline'}
                                type="button"
                            >
                                <Trash2Icon />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {files.length > 0 && (
                <p className="text-sm text-gray-600">
                    {files.length === 0
                        ? 'No file selected'
                        : `${files.length} ${files.length > 1 ? 'files' : 'file'} selected`}
                    {uploadProgress && ` (${uploadProgress}%)`}
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

            <ImagePopOver imageUrls={imageUrls} />
        </div>
    )
}
