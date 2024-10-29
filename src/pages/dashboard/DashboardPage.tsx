import { RootState } from '@/app/store'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import Dashboard from '@/components/dashboard/Dashboard'
import Header from '@/components/shared/dashnav/Header'
import Sidebar from '@/components/shared/dashnav/Sidebar'
import IUser from '@/types/userInterface'
import { useSelector } from 'react-redux'

export default function DashboardPage() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { role } = user as IUser

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                {role === 'user' ? <Dashboard /> : <AdminDashboard />}
            </div>
        </div>
    )
}
