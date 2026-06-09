import { apiSlice } from '../api/apiSlice'

export const customerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCustomer: builder.mutation({
            query: (formData) => ({
                url: '/customers/create-customer',
                method: 'POST',
                body: { data: formData },
            }),
            invalidatesTags: ['Customers'],
        }),
        getCustomers: builder.query({
            query: () => ({ url: '/customers/get-customers' }),
            providesTags: (result) =>
                result
                    ? result.customers.map(({ _id }: { _id: string }) => ({
                          type: 'Customers',
                          id: _id,
                      }))
                    : [],
        }),
        getCustomerByCustomerId: builder.query({
            query: (customerId) => ({
                url: `/customers/get-customer/${customerId}`,
            }),
        }),
    }),
})

export const {
    useCreateCustomerMutation,
    useGetCustomersQuery,
    useGetCustomerByCustomerIdQuery,
} = customerApi
