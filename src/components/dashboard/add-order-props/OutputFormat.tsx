import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { outputFormatOptions } from '@/data/addOrder'
import { IOutputFormatProps } from './interface/IAddOrderProps'

export default function OutputFormat({ setOutputFormat }: IOutputFormatProps) {
    return (
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
    )
}
