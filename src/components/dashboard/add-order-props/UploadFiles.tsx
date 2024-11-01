import { Input } from '@/components/ui/input'
import { PlusIcon } from 'lucide-react'
import { IUploadFilesProps } from './interface/IAddOrderProps'

export default function UploadFiles({
    // handleFileUpload,
    files,
    uploadProgress,
}: IUploadFilesProps) {
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
                            // onChange={(e) =>
                            //     handleFileUpload(
                            //         Array.from(e.target.files || []),
                            //     )
                            // }
                            className="hidden"
                        />
                    </label>
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
        </div>
    )
}
