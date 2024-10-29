interface IUser {
    _id: string
    userId: string
    username: string
    name: string
    email: string
    profileImage: string
}

interface IConversation {
    _id: string
    participants: string
    users: IUser[]
    message: string
    updatedAt: Date
}

export default IConversation
