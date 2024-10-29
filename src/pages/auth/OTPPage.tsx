import { Button } from '@/components/ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function OTPPage() {
    const [value, setValue] = useState('')
    const navigate = useNavigate()

    const handleSubmitOTP = () => {
        toast.success('OTP submitted successfully! Redirecting...')
    }

    const handleOTPChange = (newValue: string) => {
        setValue(newValue)
        if (newValue.length === 6) {
            handleSubmitOTP()

            setTimeout(() => {
                navigate('/auth/forget-password/new-password')
            }, 2000)
        }
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitOTP()
                }}
            >
                <div className="space-y-2">
                    <InputOTP
                        maxLength={6}
                        value={value}
                        onChange={(value) => handleOTPChange(value)}
                        autoComplete="one-time-code"
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <div className="text-center text-sm">
                        {value === '' ? (
                            <>Enter your one-time password.</>
                        ) : (
                            <>You entered: {value}</>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-2"
                        onClick={() => navigate('/auth/forget-password')}
                    >
                        Back
                    </Button>
                </div>
            </form>
        </div>
    )
}
