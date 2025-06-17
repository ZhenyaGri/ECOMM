import { getCart } from '../../../api/cartService';
import { ProductProjection } from '../../../api/productsType';

export const getCurrentLineItems = async (): Promise<
  ProductProjection[] | undefined
> => {
  const customerId = localStorage.getItem('userId');
  if (!customerId) throw new Error('Customer ID not found');
  const cartObj = await getCart({ customerId });
  console.log(cartObj);
  return cartObj.lineItems;
};
