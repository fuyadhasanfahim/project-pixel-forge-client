import { ScrollArea } from '@/components/ui/scroll-area'
import Message from './Message'
import { RootState } from '@/app/store'
import { useSelector } from 'react-redux'
import IUser from '@/types/userInterface'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useGetMessageQuery } from '@/features/messages/messageApi'
import { useGetAllConversationsQuery } from '@/features/conversations/conversationApi'
import IMessage from '@/types/messageInterface'
import { useParams } from 'react-router-dom'
import InputField from './InputField'
import { useEffect } from 'react'

export default function Messages() {
    const { conversationId } = useParams<{ conversationId: string }>()
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id } = user as IUser
    const { data } = useGetAllConversationsQuery({})
    const conversations =
        data && Array.isArray(data.conversations) ? data.conversations : []

    const { data: messages, refetch } = useGetMessageQuery(conversationId)
    const { messages: messagesData } = messages || []

    const otherUser =
        conversations
            .find((c: { _id: string }) => c._id === conversationId)
            ?.users.find((u: { _id: string }) => u._id !== _id) || {}

    useEffect(() => {
        const interval = setInterval(() => {
            refetch()
        }, 2000)

        return () => clearInterval(interval)
    }, [refetch])

    return (
        <div className="flex flex-col w-3/4 bg-white h-[88.5vh]">
            {otherUser && (
                <div className="border-b flex items-center gap-2 p-[7.5px]">
                    <Avatar>
                        <AvatarImage src={otherUser.profileImage} />
                    </Avatar>
                    <div className="flex flex-col">
                        <p>{otherUser.name}</p>
                        <span className="text-sm">@{otherUser.username}</span>
                    </div>
                </div>
            )}
            <ScrollArea className="flex-1">
                {messagesData?.map((message: IMessage, index: number) => (
                    <Message key={index} message={message} />
                ))}
            </ScrollArea>
            <InputField receiver={otherUser} refetchMessages={refetch} />
        </div>
    )
}
