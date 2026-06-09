import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Inputs({
    label,
    type,
    id,
    placeholder,
    readOnly,
    value,
    setValue,
}: {
    label: string
    type: string
    id: string
    placeholder: string
    readOnly: boolean
    value: string
    setValue: (value: string) => void
}) {
    return (
        <div className="grid items-center gap-1.5 w-full max-w-xs">
            <Label htmlFor={id} className="text-lg">
                {label}
            </Label>
            <Input
                type={type}
                id={id}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
