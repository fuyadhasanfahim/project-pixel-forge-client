interface IUser {
    _id: string
    name: string
    username: string
    email: string
    phone: string
    company: string
    country: string
    password: string
    isVerified: boolean
    emailVerificationToken: string | null
    role: string
    isActive: string
    profileImage: string
}

export default IUser
