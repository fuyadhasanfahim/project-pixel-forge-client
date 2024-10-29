import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
    const auth = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.user) {
            navigate('/auth')
        }
    }, [auth.user, navigate])

    return !!auth.user
}
