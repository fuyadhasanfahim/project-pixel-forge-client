import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDownIcon, Send } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchUserByIdQuery } from '@/features/auth/authApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import {
    useSetMessageMutation,
    useGetMessageQuery,
} from '@/features/messages/messageApi'
import toast from 'react-hot-toast'
import IMessage from '@/types/messageInterface'
import { useGetAllConversationsQuery } from '@/features/conversations/conversationApi'
import IConversation from '@/types/conversationInterface'

function getMessageClass(isSender: boolean) {
    return `max-w-xs p-3 rounded-lg shadow ${
        isSender
            ? 'bg-black text-white rounded-br-none'
            : 'border rounded-bl-none'
    }`
}

export default function FloatingChat() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id } = user as IUser
    const { data } = useFetchUserByIdQuery('6708f9eb9c8252079123e5ed')
    const adminUser = data?.user as IUser
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [setMessageMutation, { isLoading }] = useSetMessageMutation()
    const { data: allConversations } = useGetAllConversationsQuery({})

    const participants = [adminUser?._id, _id].join('-')
    const conversations =
        allConversations && Array.isArray(allConversations.conversations)
            ? allConversations.conversations.filter(
                  (conversation: IConversation) =>
                      conversation.participants.includes(participants),
              )
            : []

    const conversationId = conversations[0]?._id

    const { data: messagesData, refetch } = useGetMessageQuery(conversationId)
    const { messages } = messagesData || []
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (message.trim() === '') return

        const data = {
            senderId: _id,
            receiverId: adminUser?._id,
            message,
        }

        try {
            await setMessageMutation(data)
            setMessage('')
            refetch()
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
        }, 2000)

        return () => clearInterval(interval)
    }, [refetch])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [isOpen, messages])

    return (
        <div className="fixed inset-0 overflow-hidden flex items-end justify-end z-50">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30"
                    onClick={toggleChat}
                />
            )}

            <div className="absolute right-4 bottom-4 space-y-2">
                <Button
                    variant="outline"
                    className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-md"
                    onClick={toggleChat}
                >
                    {!isOpen ? (
                        <Send className={`w-10 h-10 transition-transform`} />
                    ) : (
                        <ChevronDownIcon
                            className={`w-10 h-10 transition-transform`}
                        />
                    )}
                </Button>

                {isOpen && (
                    <div className="rounded-lg border shadow-xl overflow-hidden w-80">
                        <div className="flex flex-col h-96 bg-gray-50">
                            <div className="p-4 flex items-center gap-4 bg-gray-200">
                                {adminUser?.profileImage && (
                                    <img
                                        src={adminUser.profileImage}
                                        className="rounded-full object-cover aspect-square h-12 w-12"
                                        alt="Avatar"
                                    />
                                )}
                                <div>
                                    <div className="font-semibold">
                                        {adminUser?.name || 'Loading...'}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        @{adminUser?.username || 'Loading...'}
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 p-4">
                                {messages?.length > 0 ? (
                                    messages.map(
                                        (message: IMessage, index: number) => {
                                            const isSender =
                                                message.senderId?._id === _id
                                            return (
                                                <div
                                                    key={index}
                                                    className={`m-2 mb-4 flex items-end ${
                                                        isSender
                                                            ? 'justify-end'
                                                            : 'justify-start'
                                                    }`}
                                                >
                                                    <div
                                                        className={getMessageClass(
                                                            isSender,
                                                        )}
                                                    >
                                                        <p>{message.message}</p>
                                                        <span className="text-xs block mt-1">
                                                            {new Date(
                                                                message.createdAt,
                                                            ).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        },
                                    )
                                ) : (
                                    <div className="text-gray-500 text-sm flex items-center justify-center">
                                        No messages yet. Start the conversation!
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </ScrollArea>

                            <form
                                className="p-4 border-t flex items-center gap-2"
                                onSubmit={handleSubmit}
                            >
                                <Input
                                    placeholder="Type a message..."
                                    className="flex-1 min-w-0"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                                <Button
                                    aria-label="Send Message"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
