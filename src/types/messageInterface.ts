interface User {
    _id: string
    name: string
    email: string
    username: string
}

interface IMessage {
    _id: string
    conversationId: string
    senderId: User
    receiverId: User
    message: string
    createdAt: string
    updatedAt: string
    __v: number
}

export default IMessage
