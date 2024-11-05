import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function SelectCredit({
    setCreditType,
}: {
    setCreditType: (value: string) => void
}) {
    return (
        <div className="w-full">
            <Label htmlFor="credit-type" className="mb-2 text-gray-700">
                Credit Type
            </Label>
            <Select onValueChange={setCreditType}>
                <SelectTrigger id="credit-type" className="w-full">
                    <SelectValue placeholder="Select credit type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Petty Cash">Petty Cash</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Loan">Loan</SelectItem>
                    <SelectItem value="Bank">Bank</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
