import { getCartObj } from './get-item-list';
import { EnvParams } from '../../../api/cartService';
const getUserToken = (key: string): string | undefined => {
  const localStorageData = localStorage.getItem(key);
  if (localStorageData) {
    const tokenObj = JSON.parse(localStorageData);
    return tokenObj.access_token;
  }
};

export const cartQuantityUpdate = async (
  itemObjId: string,
  quantity: number
): Promise<void> => {
  const token = getUserToken('authToken');
  if (!token) {
    console.error('No auth token found');
    return;
  }
  const cartObj = await getCartObj();
  if (cartObj) {
    const ver = cartObj.version;
    const cartId = cartObj.id;
    const url = `${EnvParams.VITE_CTP_API_URL}/${EnvParams.VITE_CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: ver,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: itemObjId,
            quantity: quantity,
          },
        ],
      }),
    });

    if (!response.ok) console.error('quantity hasn`t been sent');
    const updatedCart = await response.json();
    console.log('Updated lineItems:', updatedCart.lineItems);
  }
};
