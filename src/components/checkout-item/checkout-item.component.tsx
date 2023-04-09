import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { clearItemFromCart, addItemToCart, removeItemFromCart, CartItem } from '../../store/cart/cart.reducer';

import './checkout-item.styles.scss'

type CheckoutItemProps = {
    cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
    const dispatch = useDispatch();

    const { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
    const addItemToCartHandler = () => dispatch(addItemToCart(cartItem));
    const removeItemFromCartHandler = () => dispatch(removeItemFromCart(cartItem));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemFromCartHandler}>&#10094;</div>
                <div className='value'>{quantity}</div>
                <div className='arrow' onClick={addItemToCartHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={clearItemHandler}>&#10005;</span>
        </div>
    )
})

export default CheckoutItem;