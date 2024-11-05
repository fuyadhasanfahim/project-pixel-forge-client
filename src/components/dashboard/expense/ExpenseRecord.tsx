import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { Edit2Icon, Trash2Icon } from 'lucide-react'
import {
    useDeleteExpenseMutation,
    useGetExpensesQuery,
    // useUpdateExpenseMutation,
} from '@/features/expense/expenseApi'
import { ICreateExpense } from '@/types/expense.interface'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function ExpenseRecord() {
    const { data, isLoading } = useGetExpensesQuery([])
    const expenses = (data?.expenses as ICreateExpense[]) || []
    const [deleteExpense] = useDeleteExpenseMutation()
    // const [updateExpense] = useUpdateExpenseMutation()

    const handleDelete = async (expenseNumber: string) => {
        if (confirm('Are you sure you want to delete this expense?')) {
            try {
                await deleteExpense(expenseNumber).unwrap()
                toast.success('Expense deleted successfully')
            } catch (error) {
                toast.error((error as Error).message)
            }
        }
    }

    // const handleUpdate = async () => {
    //     try {
    //         const updatedExpense = await updateExpense({
    //             expenseId: 'your-expense-id',
    //             data: {},
    //         }).unwrap()
    //         console.log('Expense updated successfully:', updatedExpense)
    //     } catch (error) {
    //         console.error('Failed to update expense:', error)
    //     }
    // }

    return (
        <div className="m-4 h-screen max-h-full">
            <h1 className="text-2xl mb-6">Expenses List</h1>

            <div className="space-y-5">
                <Table className="border border-black">
                    <TableHeader className="bg-green-500">
                        <TableRow>
                            <TableHead className="text-white border border-black">
                                SN
                            </TableHead>
                            <TableHead className="text-white border border-black">
                                Date
                            </TableHead>
                            <TableHead className="text-white border border-black">
                                Expense No
                            </TableHead>
                            <TableHead className="text-white border border-black">
                                Amount
                            </TableHead>
                            <TableHead className="text-white border border-black">
                                Created At
                            </TableHead>
                            <TableHead className="text-white border border-black">
                                Note
                            </TableHead>
                            <TableHead className="text-white border border-black">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : (
                            expenses.map((expense, index) => (
                                <TableRow key={index}>
                                    <TableCell className="border border-black">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        {format(
                                            new Date(expense.date),
                                            'dd MMM yyyy',
                                        )}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        {expense.expenseNumber}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        ${expense.amount}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        {format(
                                            new Date(expense.createdAt),
                                            'dd MMM yyyy hh:mm a',
                                        )}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        {expense.notes}
                                    </TableCell>
                                    <TableCell className="border border-black">
                                        <div className="flex items-center gap-2">
                                            <Trash2Icon
                                                className="h-5 w-5 cursor-pointer"
                                                onClick={() =>
                                                    handleDelete(
                                                        expense.expenseNumber,
                                                    )
                                                }
                                            />
                                            <Edit2Icon
                                                className="h-5 w-5 cursor-pointer"
                                                // onClick={() =>
                                                //     handleUpdate(expense._id)
                                                // }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <div className="flex w-full items-center justify-end">
                    <Button>
                        <Link to={'/dashboard/create-expense'}>
                            Add Expense
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
