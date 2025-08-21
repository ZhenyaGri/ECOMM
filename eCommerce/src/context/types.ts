import { createContext } from 'react';
import { Cart } from '../api/cartType';

export type CartContextType = {
  cart: Cart | null;
  cartCount: number;
  updateCart: (cart: Cart) => void;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
  loadCart: () => void;
  isLoading: boolean;
  error: string | null;
};

export const CartContext = createContext<CartContextType>({
  cart: null,
  cartCount: 0,
  updateCart: () => {},
  refreshCart: async () => {},
  clearCart: () => {},
  loadCart: () => {},
  isLoading: false,
  error: null,
});
