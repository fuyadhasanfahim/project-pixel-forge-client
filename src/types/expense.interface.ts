export interface IAddExpenseHead {
    _id?: string
    name: string
    creditType: string
    description: string
}

export interface ICreateExpense {
    expenseNumber: string
    createdAt: string | number | Date
    credit: string
    date: string
    expenseHead: string
    reference: string
    amount: number
    notes: string
}
