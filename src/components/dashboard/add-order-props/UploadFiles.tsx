import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon } from 'lucide-react'
import { IUploadFilesProps } from './interface/IAddOrderProps'

export default function UploadFiles({
    handleFileUpload,
    files,
    uploadProgress,
}: IUploadFilesProps) {
    return (
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
                            handleFileUpload(Array.from(e.target.files || []))
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
                    ({uploadProgress && uploadProgress}%)
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
