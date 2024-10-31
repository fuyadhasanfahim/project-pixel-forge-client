import { IAddExpenseHead } from '@/types/expense.interface'
import { apiSlice } from '../api/apiSlice'

export const expenseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addExpenseHead: builder.mutation<void, IAddExpenseHead>({
            query: (newExpenseHead) => ({
                url: '/expenses/create-expense-head',
                method: 'POST',
                body: newExpenseHead,
            }),
            invalidatesTags: ['ExpenseHead'],
        }),
        getExpenseHead: builder.query({
            query: () => ({
                url: '/expenses/get-expense-head',
                method: 'GET',
            }),
            providesTags: ['ExpenseHead'],
        }),
        createExpense: builder.mutation({
            query: (newExpense) => ({
                url: '/expenses/create-expense',
                method: 'POST',
                body: newExpense,
            }),
            invalidatesTags: ['Expenses'],
        }),
        getExpenses: builder.query({
            query: () => ({
                url: '/expenses/get-expenses',
                method: 'GET',
            }),
            providesTags: ['Expenses'],
        }),
        deleteExpense: builder.mutation({
            query: (expenseNumber) => ({
                url: `/expenses/create-expense/${expenseNumber}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Expenses'],
        }),
        updateExpense: builder.mutation({
            query: ({ expenseId, data }) => ({
                url: `/expenses/update-expense/${expenseId}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Expenses'],
        }),
    }),
})

export const {
    useAddExpenseHeadMutation,
    useGetExpenseHeadQuery,
    useCreateExpenseMutation,
    useGetExpensesQuery,
    useDeleteExpenseMutation,
    useUpdateExpenseMutation
} = expenseApi
