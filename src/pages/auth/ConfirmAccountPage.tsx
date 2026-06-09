import { RootState } from '@/app/store'
import IUser from '@/types/userInterface'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ConfirmAccountPage() {
    const auth = useSelector(
        (state: RootState) => state.auth.user,
    ) as Partial<IUser>
    const user = auth
    const navigate = useNavigate()

    let content

    if (!user?.isVerified) {
        content = (
            <div className="h-screen flex justify-center items-center">
                <div>
                    <h3 className="text-green-500 text-3xl">
                        Your account is created successfully.
                    </h3>
                    <p className="text-lg font-semibold text-center text-gray-600">
                        Check Your mail box to verify your account.
                    </p>
                </div>
            </div>
        )
    } else {
        content = (
            <div>
                <span>Redirecting...</span>
            </div>
        )
    }

    useEffect(() => {
        if (user?.isVerified) {
            navigate('/', { replace: true })
        }
    }, [navigate, user])

    return content
}
