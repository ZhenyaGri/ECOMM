import React, { useState } from 'react';
import { Img } from '../img/img';
import { Wrapper } from '../wrapper/wrapper';
import { Product } from '../../types/types';
import { Heading } from '../heading/heading';
import { Link } from 'react-router-dom';
import { Button } from '../button/button';
import { getCart } from '../../api/cartService';
import { getToken } from '../../api/authHandlers';
import {
  getCartId,
  handleAnonymousUserCart,
  handleAuthenticatedUserCart,
  setCartId,
} from '../../api/cartHandlers';

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
  const hasSecondImage = imageUrls.length > 1;

  const handleAddToCart = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const token = await getToken('authToken');
      const existingCartId = getCartId();

      if (existingCartId && (await getCart({ cartId: existingCartId }))) return;

      const cart = token
        ? await handleAuthenticatedUserCart()
        : await handleAnonymousUserCart(existingCartId);

      if (cart?.id) {
        setCartId(cart.id);
        // await addLineItem(cart.id, id);
      }
    } catch (error) {
      console.error('Error in cart handling:', error);
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
        children={isLoading ? 'ADDING...' : 'ADD TO CART'}
        onClick={() => {
          handleAddToCart();
        }}
        className="btn-dark btn-cart-catalog"
      ></Button>
    </Wrapper>
  );
};
