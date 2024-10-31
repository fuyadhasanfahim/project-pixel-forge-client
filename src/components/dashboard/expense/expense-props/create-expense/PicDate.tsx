import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function PicDate() {
    const [date, setDate] = useState<Date>()

    return (
        <div className="w-full">
            <Label htmlFor="date" className="block mb-2 text-gray-700">
                Date
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center text-gray-500',
                            !date && 'text-muted-foreground',
                        )}
                    >
                        <CalendarIcon className="mr-2" />
                        {date ? (
                            format(date, 'PPP')
                        ) : (
                            <span>Select a Date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2 bg-white shadow-lg rounded-lg border border-gray-200">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        fromDate={new Date()}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
