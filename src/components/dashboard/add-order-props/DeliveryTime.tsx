import { useState, useEffect } from 'react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { TimePickerProps } from './interface/IAddOrderProps'

const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
)

const minutes = ['00', '15', '30', '45', '60']

export const DeliveryTime: React.FC<TimePickerProps> = ({ setTime }) => {
    const [selectedHour, setSelectedHour] = useState<string>('00')
    const [selectedMinute, setSelectedMinute] = useState<string>('00')

    useEffect(() => {
        setTime({ hour: selectedHour, minute: selectedMinute })
    }, [selectedHour, selectedMinute, setTime])

    return (
        <div>
            <h3 className="mb-3 text-lg">
                Choose Delivery Time (International Formate)
            </h3>
            <div className="flex items-center gap-x-5">
                <Select value={selectedHour} onValueChange={setSelectedHour}>
                    <SelectTrigger className="w-16">
                        <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                        {hours.map((hour) => (
                            <SelectItem key={hour} value={hour}>
                                {hour}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={selectedMinute}
                    onValueChange={setSelectedMinute}
                >
                    <SelectTrigger className="w-16">
                        <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent>
                        {minutes.map((minute) => (
                            <SelectItem key={minute} value={minute}>
                                {minute}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
