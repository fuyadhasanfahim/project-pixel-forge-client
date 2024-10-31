import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/auth')
        }
    }, [user, navigate])

    return !!user
}
