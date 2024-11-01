import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import IUser from '../types/userInterface'

interface PrivateRouteProps {
    children: React.ReactNode
    allowedRoles?: string[]
}

export default function PrivateRoute({
    children,
    allowedRoles,
}: PrivateRouteProps) {
    const isLoggedIn = useAuth()
    const { user } = useSelector((state: RootState) => state.auth)
    const { role } = (user as IUser) || {}

    if (!isLoggedIn) return <Navigate to="/auth" replace />

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}
