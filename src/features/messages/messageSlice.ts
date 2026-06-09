import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IMessage from '@/types/messageInterface' // Import IMessage

interface MessageState {
    messages: IMessage[]
}

const initialState: MessageState = {
    messages: [],
}

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload)
        },
        setMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload
        },
    },
})

export const { addMessage, setMessages } = messageSlice.actions
export default messageSlice.reducer
