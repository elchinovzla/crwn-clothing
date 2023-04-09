import { FC, memo } from 'react';
import './cart-item.style.scss';
import { CartItem as TCartItem } from '../../store/cart/cart.reducer';

type CartItemProps = {
    cartItem: TCartItem;
}

//memo avoids the map that consumes this component re-render unneeded pieces of the map
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x {price}</span>
            </div>
        </div>
    )
})

export default CartItem;