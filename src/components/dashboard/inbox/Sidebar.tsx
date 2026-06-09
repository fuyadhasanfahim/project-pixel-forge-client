import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import ChatItems from './ChatItems'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

export default function Sidebar() {
    return (
        <div className={cn('w-1/4 border-r h-[88.5vh]')}>
            <h2 className={cn('text-2xl mb-4 font-bold border-b p-[13.5px]')}>
                <Link to={'/inbox'} className="flex items-center gap-2">
                    <Mail />
                    Inbox
                </Link>
            </h2>
            <ScrollArea>
                <ChatItems />
            </ScrollArea>
        </div>
    )
}
