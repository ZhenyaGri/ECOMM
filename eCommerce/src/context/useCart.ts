import { useContext } from 'react';
import { CartContext, CartContextType } from './types';

export const useCart = (): CartContextType => useContext(CartContext);
