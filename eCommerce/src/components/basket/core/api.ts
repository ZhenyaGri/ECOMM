import { getCartObj } from './get-item-list';
import { EnvParams, removeLineItem } from '../../../api/cartService';

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
  let token = getUserToken('authToken');
  if (!token) {
    token = getUserToken('anonymousToken');
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
  }
};

export const removeItem = async (
  itemObjId: string,
  quantity: number | undefined
): Promise<void> => {
  const cartObj = await getCartObj();
  if (cartObj) {
    if (quantity) {
      await removeLineItem(cartObj.id, cartObj.version, itemObjId, quantity);
    }
  }
};

export const clearItemLine = async (): Promise<void> => {
  const cartObj = await getCartObj();
  if (cartObj) {
    if (cartObj.lineItems) {
      for (const obj of cartObj.lineItems) {
        const updatedCart = await removeLineItem(
          cartObj.id,
          cartObj.version,
          obj.id,
          obj.quantity
        );
        cartObj.version = updatedCart.version;
      }
    }
  }
};
