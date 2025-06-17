import { createCart, getCart } from './cartService';
import { Cart } from './cartType';
import { parseError } from './errorHandler';

export function setCartId(cartId: string): void {
  localStorage.setItem('cartId', cartId);
}

export function getCartId(): string | null {
  return localStorage.getItem('cartId');
}

export function removeCartId(): void {
  localStorage.removeItem('cartId');
}

export const handleAuthenticatedUserCart = async (): Promise<Cart> => {
  const customerId = localStorage.getItem('userId');
  if (!customerId) throw new Error('Customer ID not found');
  try {
    const test = await getCart({ customerId });
    console.log('exist', test);
    //test
    return await getCart({ customerId });
  } catch (error) {
    const parsedError = parseError(error);
    if ('statusCode' in parsedError && parsedError.statusCode === 404) {
      // test
      const test = await createCart();
      console.log('new', test);
      return await createCart();
    }
    throw error;
  }
};

export const handleAnonymousUserCart = async (
  existingCartId?: string | null
): Promise<Cart> => {
  if (existingCartId) {
    try {
      return await getCart({ cartId: existingCartId });
    } catch {
      return await createCart();
    }
  }
  return await createCart();
};
