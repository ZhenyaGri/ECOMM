import React, { useEffect, useState } from 'react';
import { Img } from '../img/img';
import { Wrapper } from '../wrapper/wrapper';
import { Product } from '../../types/types';
import { Heading } from '../heading/heading';
import { Link } from 'react-router-dom';
import { Button } from '../button/button';
import { addLineItem, getCart, removeLineItem } from '../../api/cartService';
import {
  getCartId,
  handleAnonymousUserCart,
  handleAuthenticatedUserCart,
  setCartId,
} from '../../api/cartHandlers';
import { Cart } from '../../api/cartType';
import { useCart } from '../../context/useCart';

export const ProductCard: React.FC<Product> = ({
  id,
  name,
  price,
  imageUrls,
  urlSlug,
  discount,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, updateCart } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const hasSecondImage = imageUrls.length > 1;
  const lineItem = cart?.lineItems?.find((item) => item.productId === id);
  const lineItemId = lineItem?.id || '';

  useEffect(() => {
    if (cart?.lineItems) {
      const itemInCart = cart.lineItems.some((item) => item.productId === id);
      setIsAddedToCart(itemInCart);
    }
  }, [cart, id]);

  const handleAddToCart = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const existingCartId = getCartId();

      let currentCart: Cart;

      if (existingCartId) {
        try {
          currentCart = await getCart({ cartId: existingCartId });
        } catch {
          currentCart = sessionStorage.getItem('loggedIn')
            ? await handleAuthenticatedUserCart()
            : await handleAnonymousUserCart();
        }
      } else {
        currentCart = sessionStorage.getItem('loggedIn')
          ? await handleAuthenticatedUserCart()
          : await handleAnonymousUserCart();
      }
      let updatedCart: Cart;
      if (isAddedToCart) {
        updatedCart = await removeLineItem(
          currentCart.id,
          currentCart.version,
          lineItemId,
          1
        );
        setIsAddedToCart(false);
      } else {
        updatedCart = await addLineItem(
          currentCart.id,
          currentCart.version,
          id,
          1,
          1
        );
        setIsAddedToCart(true);
      }
      setCartId(updatedCart.id);
      updateCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper className="wrapper-catalog-card">
      <Link
        to={`/catalog/${urlSlug}`}
        className="link-catalog-card"
        state={{ product: { id, name, price, imageUrls } }}
      >
        <div
          className="product-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Wrapper className="wrapper-catalog-img">
            <Img
              src={isHovered && hasSecondImage ? imageUrls[1] : imageUrls[0]}
              alt={name}
              className="product-card"
            />
          </Wrapper>
          <Wrapper className="product-card-info">
            <Heading
              tag="h3"
              className="product-card-name"
              content={name.toUpperCase()}
            />
            <Wrapper className="product-card-price-container">
              {discount && discount !== 0 ? (
                <Heading
                  tag="h2"
                  className="product-card-discount"
                  content={`€ ${discount.toFixed(2)}`}
                />
              ) : null}
              <Heading
                tag="h3"
                className="product-card-price"
                content={`€ ${price.toFixed(2)}`}
              />
            </Wrapper>
          </Wrapper>
        </div>
      </Link>
      <Button
        type="button"
        children={
          isAddedToCart
            ? 'REMOVE FROM CART'
            : isLoading
              ? 'ADDING...'
              : 'ADD TO CART'
        }
        onClick={handleAddToCart}
        className={`btn-dark btn-cart-catalog ${isAddedToCart ? 'btn-in-cart' : ''}`}
        disabled={isLoading}
      />
    </Wrapper>
  );
};
