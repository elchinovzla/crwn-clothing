import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
import { selectCartItems } from '../../store/cart/cart.selector';

const sleep = (milliseconds: number): void => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if (new Date().getTime() - start > milliseconds) {
            break;
        }
    }
}

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    //useMemo memoizes the value
    const hundredCount = useMemo(() => {
        console.log('start');
        sleep(2000);
        console.log('end');
    }, []);

    //useCallback memoizes the function
    const goToCheckoutHandler = useCallback(() => {
        navigate('/checkout')
    }, [navigate]);

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) =>
                        <CartItem key={item.id} cartItem={item} />)) :
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;