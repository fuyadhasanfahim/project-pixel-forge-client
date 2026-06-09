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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search, Trash2Icon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGetExpenseHeadQuery } from '@/features/expense/expenseApi'
import { IAddExpenseHead } from '@/types/expense.interface'
import { Link } from 'react-router-dom'

export default function ExpensesHead() {
    const { data, isLoading, isError } = useGetExpenseHeadQuery([])

    return (
        <div className="m-4 h-screen max-h-full">
            <h1 className="text-2xl mb-6">Expenses List</h1>

            <div className="flex flex-wrap items-center justify-between">
                <div className="mb-6 w-full max-w-28">
                    <h3>Records per page</h3>

                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="All">All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="relative w-full max-w-xs">
                    <Input
                        type="text"
                        className="pl-10 pr-10"
                        placeholder="Search your keyword..."
                    />
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
            </div>

            <div className="space-y-5">
                {isLoading && <p>Loading...</p>}
                {isError && <p className="text-red-500">Error loading data.</p>}

                {Array.isArray(data?.expenses) && (
                    <Table className="border border-black">
                        <TableHeader className="bg-green-500">
                            <TableRow>
                                <TableHead className="text-white border border-black">
                                    SN
                                </TableHead>
                                <TableHead className="text-white border border-black">
                                    Name
                                </TableHead>
                                <TableHead className="text-white border border-black">
                                    Type
                                </TableHead>
                                <TableHead className="text-white border border-black">
                                    Description
                                </TableHead>
                                <TableHead className="text-white border border-black">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.expenses.map(
                                (expense: IAddExpenseHead, index: number) => (
                                    <TableRow key={expense._id || index}>
                                        <TableCell className="border border-black">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="border border-black">
                                            {expense?.name || 'N/A'}
                                        </TableCell>
                                        <TableCell className="border border-black">
                                            {expense?.creditType || 'N/A'}
                                        </TableCell>
                                        <TableCell className="border border-black">
                                            {expense?.description || 'N/A'}
                                        </TableCell>
                                        <TableCell className="border border-black">
                                            <Trash2Icon className="h-5 w-5 cursor-pointer" />
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                )}

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
                    <Link to={'/add-expenses-head'}>
                        <Button>Add Expense</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
