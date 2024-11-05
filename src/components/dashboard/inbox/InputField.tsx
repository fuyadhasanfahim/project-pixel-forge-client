import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSetMessageMutation } from '@/features/messages/messageApi'
import IUser from '@/types/userInterface'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import toast from 'react-hot-toast'

interface IInputFieldProps {
    receiver: {
        _id: string
        name: string
        email: string
        username: string
        profileImage: string
    }
    refetchMessages: () => void
}

export default function InputField({
    receiver,
    refetchMessages,
}: IInputFieldProps) {
    const { user } = useSelector((state: RootState) => state.auth)
    const { _id } = user as IUser
    const [message, setMessage] = useState('')

    const [setMessageMutation, { isLoading }] = useSetMessageMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (message.trim() === '') return

        const data = {
            senderId: _id,
            receiverId: receiver?._id,
            message,
        }

        try {
            await setMessageMutation(data)
            setMessage('')
            refetchMessages()
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <form
            className="flex items-center gap-2 p-2 bg-white border-t shadow-md"
            onSubmit={handleSubmit}
        >
            <Input
                placeholder="Type a message..."
                className="flex-1 focus:ring-0 focus:outline-none rounded-lg p-2 border"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <Button
                aria-label="Send Message"
                type="submit"
                disabled={isLoading}
            >
                <Send className="text-white h-5 w-5" />
            </Button>
        </form>
    )
}
