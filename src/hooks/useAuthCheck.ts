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

    const { data, isLoading, isError } = useFetchCurrentUserQuery(token, {
        skip: !token,
    })

    useEffect(() => {
        if (!isLoading && !isError) {
            if (data?.user && token) {
                dispatch(
                    userLoggedIn({
                        user: data.user,
                    }),
                )
            }
            setAuthChecked(true)
        }
    }, [data, dispatch, isLoading, isError, token])

    return authChecked
}
