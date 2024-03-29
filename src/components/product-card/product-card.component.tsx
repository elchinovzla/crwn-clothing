import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.reducer';
import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
} from './product-card.styles';
import { CategoryItem } from '../../store/categories/category.reducer';

type ProductCardProps = {
    product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();

    const { name, price, imageUrl } = product;

    const addProductToCart = () => dispatch(addItemToCart(product));

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                Add to cart
            </Button>
        </ProductCartContainer>
    );
}

export default ProductCard;