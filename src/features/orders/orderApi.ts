/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiSlice } from '../api/apiSlice'

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadFiles: builder.mutation({
            async queryFn(data, _queryApi, _extraOptions, _fetchWithBQ) {
                const xhr = new XMLHttpRequest()
                return new Promise((resolve, reject) => {
                    xhr.open(
                        'POST',
                        'http://localhost:5000/api/v1/orders/upload-files',
                    )

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const progress = Math.round(
                                (event.loaded * 100) / event.total,
                            )
                            data.onProgress(progress)
                        }
                    }

                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            resolve({ data: JSON.parse(xhr.response) })
                        } else {
                            reject({
                                error: xhr.responseText || 'Upload failed',
                            })
                        }
                    }

                    xhr.onerror = () =>
                        reject({ error: xhr.responseText || 'Network error' })

                    xhr.send(data.body)
                })
            },
        }),
        postOrder: builder.mutation({
            query: (data) => ({
                url: '/orders/create-order',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),
        fetchOrderByUserId: builder.query({
            query: (userId) => `/orders/get-order/${userId}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.orders.map(({ _id }: { _id: string }) => ({
                              type: 'Orders' as const,
                              id: _id,
                          })),
                          { type: 'Orders', id: 'LIST' },
                      ]
                    : [{ type: 'Orders', id: 'LIST' }],
        }),

        fetchOrderByOrderId: builder.query({
            query: (orderId) => `/orders/get-order-by-order-id/${orderId}`,
            providesTags: (result) =>
                result ? [{ type: 'Orders', id: result._id }] : ['Orders'],
        }),

        fetchAllOrders: builder.query({
            query: () => `/orders/get-all-orders`,
            providesTags: (result) =>
                result
                    ? result?.orders.map(({ _id }: { _id: string }) => ({
                          type: 'Orders',
                          id: _id,
                      }))
                    : ['Orders'],
        }),
        updateOrder: builder.mutation({
            query: ({ orderId, updateData }) => ({
                url: `/orders/update-order/${orderId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (_result, _error, { orderId }) => [
                { type: 'Orders', id: orderId },
                'Orders',
            ],
        }),
    }),
})

export const {
    useUploadFilesMutation,
    usePostOrderMutation,
    useFetchOrderByUserIdQuery,
    useFetchOrderByOrderIdQuery,
    useFetchAllOrdersQuery,
    useUpdateOrderMutation,
} = orderApi
