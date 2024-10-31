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
import { Trash2Icon } from 'lucide-react'

export default function ExpenseRecord() {
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
                        <TableRow key={1}>
                            <TableCell className="border border-black">
                                1
                            </TableCell>
                            <TableCell className="border border-black">
                                31 Oct 2024
                            </TableCell>
                            <TableCell className="border border-black">
                                EXP-B0-311024-001
                            </TableCell>
                            <TableCell className="border border-black">
                                $ 2,555.00
                            </TableCell>
                            <TableCell className="border border-black">
                                31 Oct 2024 09:51 AM
                            </TableCell>
                            <TableCell className="border border-black">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Consectetur...
                            </TableCell>
                            <TableCell className="border border-black">
                                <Trash2Icon className="h-5 w-5" />
                            </TableCell>
                        </TableRow>
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
                    <Button>Add Expense</Button>
                </div>
            </div>
        </div>
    )
}
