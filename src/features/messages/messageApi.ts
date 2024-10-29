import { apiSlice } from '../api/apiSlice'

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: (conversationId) => ({
                url: `/messages/get-message/${conversationId}`,
                method: 'GET',
            }),
            providesTags: ['Messages', 'Conversations'],
            keepUnusedDataFor: 0,
        }),
        setMessage: builder.mutation({
            query: (data) => ({
                url: '/messages/set-message',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Messages'],
        }),
    }),
})

export const { useGetMessageQuery, useSetMessageMutation } = messageApi
