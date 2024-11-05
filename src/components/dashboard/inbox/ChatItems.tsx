import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { useGetAllConversationsQuery } from '@/features/conversations/conversationApi'
import IConversation from '@/types/conversationInterface'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'

export default function ChatItems() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { email } = user as IUser
    const { data } = useGetAllConversationsQuery({})

    const conversations =
        data && Array.isArray(data.conversations) ? data.conversations : []

    return (
        <div>
            {conversations.map((conversation: IConversation) => {
                const { users, message, updatedAt } = conversation

                const otherUser = users.find((user) => user.email !== email)

                return (
                    <Link
                        to={`/dashboard/inbox/${conversation._id}`}
                        key={conversation._id}
                    >
                        <div className="flex items-center gap-x-3 border p-2 rounded-lg hover:bg-gray-100 duration-300 transition-all mx-2 my-2">
                            {otherUser && (
                                <Avatar key={otherUser._id}>
                                    <AvatarImage
                                        src={otherUser?.profileImage}
                                        alt={otherUser.name}
                                    />
                                </Avatar>
                            )}
                            <div className="w-full">
                                <h3 className="text-lg">
                                    {otherUser?.name || 'Unknown User'}
                                </h3>
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <p>{message}</p>
                                    <span className="text-xs">
                                        {new Date(
                                            updatedAt,
                                        ).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
