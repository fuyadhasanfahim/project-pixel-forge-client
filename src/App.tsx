import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import ResetPassword from './pages/auth/ResetPassword'
import { Toaster } from 'react-hot-toast'
import OTPPage from './pages/auth/OTPPage'
import NewPasswordPage from './pages/auth/NewPasswordPage'
import useAuthCheck from './hooks/useAuthCheck'
import EmailVerificationPage from './pages/auth/EmailVerificationPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import ConfirmAccountPage from './pages/auth/ConfirmAccountPage'
import AddOrderPage from './pages/dashboard/AddOrderPage'
import PreviousOrdersPage from './pages/dashboard/PreviousOrdersPage'
import OrderInfoPage from './pages/dashboard/OrderInfoPage'
import InboxPage from './pages/dashboard/InboxPage'
import OnlyInboxPage from './pages/dashboard/OnlyInbox'
import FloatingChat from './pages/FloatingMessageButton/FloatingMessageButton'
import { useSelector } from 'react-redux'
import { RootState } from './app/store'
import IUser from './types/userInterface'
import AddExpensesHeadPage from './pages/dashboard/expense-page/AddExpensesHead'
import CreateExpensePage from './pages/dashboard/expense-page/CreateExpensePage'
import ExpenseRecordPage from './pages/dashboard/expense-page/ExpenseRecordPage'
import ExpensesHeadPage from './pages/dashboard/expense-page/ExpensesHeadPage'

export default function App() {
    const { user } = useSelector((state: RootState) => state.auth)
    const { role } = (user as IUser) || {}
    const authChecked = useAuthCheck()

    return !authChecked ? (
        <div className="h-screen flex justify-center items-center bg-white">
            <img
                className="h-16 w-16"
                src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                alt=""
            />
        </div>
    ) : (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <PublicRoute>
                            <AuthPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/verify-email"
                    element={
                        <PrivateRoute>
                            <EmailVerificationPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/auth/forget-password"
                    element={
                        <PrivateRoute>
                            <ResetPassword />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/auth/forget-password/opt"
                    element={
                        <PrivateRoute>
                            <OTPPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/auth/forget-password/new-password"
                    element={
                        <PrivateRoute>
                            <NewPasswordPage />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/auth/confirm-account"
                    element={
                        <PrivateRoute>
                            <ConfirmAccountPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/add-order"
                    element={
                        <PrivateRoute>
                            <AddOrderPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/previous-orders"
                    element={
                        <PrivateRoute>
                            <PreviousOrdersPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/view-order-info/:orderId"
                    element={
                        <PrivateRoute>
                            <OrderInfoPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/inbox"
                    element={
                        <PrivateRoute>
                            <OnlyInboxPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/inbox/:conversationId"
                    element={
                        <PrivateRoute>
                            <InboxPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/expenses-head"
                    element={
                        <PrivateRoute>
                            <ExpensesHeadPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/expense-record"
                    element={
                        <PrivateRoute>
                            <ExpenseRecordPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/create-expense"
                    element={
                        <PrivateRoute>
                            <CreateExpensePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dashboard/add-expenses-head"
                    element={
                        <PrivateRoute>
                            <AddExpensesHeadPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
            {role === 'user' && <FloatingChat />}
            <Toaster position="bottom-right" reverseOrder={false} />
        </BrowserRouter>
    )
}
