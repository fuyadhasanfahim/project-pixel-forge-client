import CreateUser from '@/components/dashboard/CreateUser'
import Header from '@/components/shared/dashnav/Header'
import Sidebar from '@/components/shared/dashnav/Sidebar'

export default function CreateUserPage() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                <CreateUser />
            </div>
        </div>
    )
}
