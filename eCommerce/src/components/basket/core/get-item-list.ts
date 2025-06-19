import { getCart } from '../../../api/cartService';
import { ProductProjection } from '../../../api/productsType';
import { Cart } from '../../../api/cartType';

export const getCartObj = async (): Promise<Cart | undefined> => {
  const customerId = localStorage.getItem('userId');
  const cartId = localStorage.getItem('cartId');
  if (cartId) {
    const cartObj = await getCart({ cartId });
    return cartObj;
  } else if (customerId) {
    const cartObj = await getCart({ customerId });
    return cartObj;
  } else {
    console.warn('No cartId or customerId found');
    return undefined;
  }
};

export const getCurrentLineItems = async (): Promise<
  ProductProjection[] | undefined
> => {
  const cartObj = await getCartObj();
  if (cartObj) {
    return cartObj.lineItems;
  }
};
