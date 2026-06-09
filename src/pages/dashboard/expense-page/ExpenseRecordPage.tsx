import ExpenseRecord from '@/components/dashboard/expense/ExpenseRecord'
import Header from '@/components/shared/dashnav/Header'
import Sidebar from '@/components/shared/dashnav/Sidebar'

export default function ExpenseRecordPage() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                <ExpenseRecord />
            </div>
        </div>
    )
}
