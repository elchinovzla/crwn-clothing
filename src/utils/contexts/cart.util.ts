import { CartItem } from "../../store/cart/cart.reducer";
import { CategoryItem } from "../../store/categories/category.reducer";
import { withMatcher } from "../reducer/reducer.utils";

export const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if (existingCartItem && existingCartItem.quantity <= 1) {
        return clearProduct(cartItems, existingCartItem);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}

export const clearProduct = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
}