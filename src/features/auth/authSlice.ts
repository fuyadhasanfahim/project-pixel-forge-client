import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
    user: object | undefined
}

const initialState: AuthState = {
    user: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user
        },
        userLoggedOut: (state) => {
            state.user = undefined
        },
    },
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer
