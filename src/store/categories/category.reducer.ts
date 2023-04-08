import { createSlice } from "@reduxjs/toolkit";

export type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};

export type Category = {
    title: string;
    imageUrl: string;
    items: CategoryItem[];
};

export type CategoryState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export type CategoryMap = {
    [key: string]: CategoryItem[];
};

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null,
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        fetchCategoriesStart(state) {
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