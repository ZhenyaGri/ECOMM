import { getCart } from '../../../api/cartService';
import { ProductProjection } from '../../../api/productsType';
import { Cart } from '../../../api/cartType';

export const getCartObj = async (): Promise<Cart | undefined> => {
  const customerId = localStorage.getItem('userId');
  if (!customerId) throw new Error('Customer ID not found');
  const cartObj = await getCart({ customerId });
  console.log(cartObj);
  return cartObj;
};

export const getCurrentLineItems = async (): Promise<
  ProductProjection[] | undefined
> => {
  const cartObj = await getCartObj();
  if (cartObj) {
    return cartObj.lineItems;
  }
};
