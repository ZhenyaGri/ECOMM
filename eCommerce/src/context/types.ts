import { createContext } from 'react';
import { Cart } from '../api/cartType';

export type CartContextType = {
  cart: Cart | null;
  updateCart: (cart: Cart) => void;
  loadCart: () => void;
  isLoading: boolean;
  error: string | null;
};

export const CartContext = createContext<CartContextType>({
  cart: null,
  updateCart: () => {},
  loadCart: () => {},
  isLoading: false,
  error: null,
});
