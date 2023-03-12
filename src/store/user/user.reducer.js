import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState: INITIAL_STATE,
    reducers: {
        signInSuccess(state, action) {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signOutSucceeded(state, action) {
            state.currentUser = null;
            state.isLoading = false;
            state.error = null;
        },
        userFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
            console.log(action.payload);
        }
    }
})

export const { signInSuccess, signOutSucceeded, userFailed } = userSlice.actions;
export const userReducer = userSlice.reducer;