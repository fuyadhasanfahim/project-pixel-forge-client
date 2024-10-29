import { useVerifyEmailMutation } from '@/features/auth/authApi'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const EmailVerificationPage = () => {
    const [verifyEmail, { isLoading, isError, isSuccess }] =
        useVerifyEmailMutation()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const token = query.get('token')

        if (token) {
            verifyEmail(token)
                .unwrap()
                .then(() => {
                    toast.success('Email verified successfully!')
                })
                .catch((error) => {
                    toast.error((error as Error).message)
                })
        }
    }, [location.search, verifyEmail])

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)
        }
    }, [isSuccess, navigate])

    if (isLoading)
        return (
            <p className="h-screen flex justify-center items-center text-4xl font-semibold">
                Verifying your email...
            </p>
        )
    if (isError)
        return (
            <p className="h-screen flex justify-center items-center text-4xl font-semibold">
                Error verifying email. Please try again.
            </p>
        )
    if (isSuccess)
        return (
            <p className="h-screen flex justify-center items-center text-4xl font-semibold">
                Your email has been verified! Redirecting...
            </p>
        )

    return null
}

export default EmailVerificationPage
