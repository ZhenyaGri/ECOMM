import { useState, useEffect } from 'react';
import {
  getCartId,
  handleAnonymousUserCart,
  handleAuthenticatedUserCart,
  setCartId,
} from '../../api/cartHandlers';
import { addLineItem, getCart, removeLineItem } from '../../api/cartService';
import { useCart } from '../../context/useCart';
import { Cart } from '../../api/cartType';
import { AddToCartProps } from '../../types/types';

export const useAddToCart = (productId: string | null): AddToCartProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { cart, updateCart } = useCart();

  const lineItem = cart?.lineItems?.find(
    (item) => item.productId === productId
  );
  const lineItemId = lineItem?.id || '';
  useEffect(() => {
    if (cart?.lineItems) {
      const itemInCart = cart.lineItems.some(
        (item) => item.productId === productId
      );
      setIsAddedToCart(itemInCart);
    }
  }, [cart, productId]);

  const handleAddToCart = async (): Promise<void> => {
    if (!productId) return;

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
          productId,
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

  return {
    handleAddToCart,
    isAddedToCart,
    isLoading,
  };
};
