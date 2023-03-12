import { createSlice } from "@reduxjs/toolkit";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        fetchCategoriesStart(state, action) {
            state.isLoading = true;
        },
        fetchCategoriesSucceded(state, action) {
            state.categories = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchCategoriesFailed(state, action) {
            state.categories = [];
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const { fetchCategoriesStart, fetchCategoriesSucceded, fetchCategoriesFailed } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;