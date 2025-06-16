import { ReactNode, useEffect, useState } from 'react';
import { Cart } from '../api/cartType';
import { getCart } from '../api/cartService';
import { CartContext } from './types';

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCart = (newCart: Cart): void => {
    setCart(newCart);
    localStorage.setItem('cartId', newCart.id);
  };

  const loadCart = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        const currentCart = await getCart({ cartId });
        setCart(currentCart);
      }
    } catch (err) {
      setError('Failed to load cart');
      console.error('Cart loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, updateCart, isLoading, error }}>
      {children}
    </CartContext.Provider>
  );
};
