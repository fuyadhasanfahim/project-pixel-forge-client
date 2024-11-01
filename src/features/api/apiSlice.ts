/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/',
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken')

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: [
        'Orders',
        'Conversations',
        'Messages',
        'ExpenseHead',
        'Expenses',
        'Customers',
    ],
    endpoints: (_builder) => ({}),
})
