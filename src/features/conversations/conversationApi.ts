import { apiSlice } from '../api/apiSlice'

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllConversations: builder.query({
            query: () => ({
                url: '/messages/get-all-conversations',
                method: 'GET',
            }),
            providesTags: ['Messages', 'Conversations'],
            keepUnusedDataFor: 0,
        }),
    }),
})

export const { useGetAllConversationsQuery } = conversationApi
