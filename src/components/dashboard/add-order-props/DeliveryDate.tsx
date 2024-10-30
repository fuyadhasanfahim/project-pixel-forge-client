import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { IDeliveryDateProps } from './interface/IAddOrderProps'

export default function DeliveryDate({ date, setDate }: IDeliveryDateProps) {
    return (
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
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
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
    )
}
