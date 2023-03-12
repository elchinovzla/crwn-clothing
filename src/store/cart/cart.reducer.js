import { createSlice } from "@reduxjs/toolkit";
import { addCartItem, clearProduct, removeCartItem } from "../../utils/contexts/cart.util";

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: CART_INITIAL_STATE,
    reducers: {
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart(state, action) {
            state.cartItems = clearProduct(state.cartItems, action.payload);
        },
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        }
    }
});

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;