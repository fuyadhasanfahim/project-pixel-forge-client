import { AppDispatch } from '@/app/store'
import { useFetchCurrentUserQuery } from '@/features/auth/authApi'
import { userLoggedIn } from '@/features/auth/authSlice'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function useAuthCheck() {
    const dispatch = useDispatch<AppDispatch>()
    const [authChecked, setAuthChecked] = useState(false)
    const token = Cookies.get('accessToken')

    const { data, isLoading } = useFetchCurrentUserQuery(token)

    useEffect(() => {
        if (data?.user && token) {
            dispatch(
                userLoggedIn({
                    user: data.user,
                }),
            )
        }

        setAuthChecked(!isLoading)
    }, [data, dispatch, isLoading, token])

    return authChecked
}
