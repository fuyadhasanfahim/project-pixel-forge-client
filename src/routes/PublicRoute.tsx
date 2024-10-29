import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PublicRoute({
    children,
}: {
    children: React.ReactNode
}) {
    const isLoggedIn = useAuth()

    return !isLoggedIn ? children : <Navigate to={'/auth/confirm-account'} />
}
