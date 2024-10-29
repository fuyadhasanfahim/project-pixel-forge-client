import { RootState } from '@/app/store'
import IMessage from '@/types/messageInterface'
import IUser from '@/types/userInterface'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

function getMessageClass(isSender: boolean) {
    return `max-w-xs p-3 rounded-lg shadow ${
        isSender
            ? 'bg-black text-white rounded-br-none'
            : 'border rounded-bl-none'
    }`
}

export default function Message({ message }: { message: IMessage }) {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id } = user as IUser

    const isSender = message.senderId._id === _id

    const messagesEndRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [message])

    return (
        <div
            className={`m-2 mb-4 flex items-end ${isSender ? 'justify-end' : 'justify-start'}`}
        >
            <div className={getMessageClass(isSender)}>
                <p>{message.message}</p>
                <span className="text-xs block mt-1">
                    {new Date(message.createdAt).toLocaleTimeString()}
                </span>
            </div>
            <div ref={messagesEndRef} />
        </div>
    )
}
