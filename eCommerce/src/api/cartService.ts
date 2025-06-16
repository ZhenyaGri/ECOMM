import { getToken } from './authHandlers';
import { Cart, CartDraft } from './cartType';
import { BodyRequest, ImportMetaEnv } from './type';

const EnvParams: ImportMetaEnv = {
  VITE_CTP_PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY,
  VITE_CTP_CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET,
  VITE_CTP_AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL,
  VITE_CTP_API_URL: import.meta.env.VITE_CTP_API_URL,
  VITE_CTP_SCOPES: import.meta.env.VITE_CTP_SCOPES,
};

export async function sendHTTPRequest<T>(
  endpoint: string,
  method: string = 'GET',
  body?: BodyRequest
): Promise<T> {
  const token =
    (await getToken('authToken'))?.access_token ||
    (await getToken('anonymousToken'))?.access_token;

  if (!token) {
    throw new Error('No authentication token available');
  }

  const url = `${EnvParams.VITE_CTP_API_URL}/${EnvParams.VITE_CTP_PROJECT_KEY}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData);
    throw errorData;
  }

  return response.json();
}

export async function createCart(
  currency: string = 'EUR',
  customerId?: string,
  anonymousId?: string,
  shippingAddress?: string,
  billingAddress?: string
): Promise<Cart> {
  const token =
    (await getToken('authToken'))?.access_token ||
    (await getToken('anonymousToken'))?.access_token;

  if (!token) {
    throw new Error('No authentication token available');
  }

  const url = `${EnvParams.VITE_CTP_API_URL}/${EnvParams.VITE_CTP_PROJECT_KEY}/me/carts`;

  const requestBody: CartDraft = {
    currency,
  };

  if (customerId) {
    requestBody.customerId = customerId;
    requestBody.billingAddress = billingAddress;
    requestBody.shippingAddress = shippingAddress;
  } else if (anonymousId) {
    requestBody.anonymousId = anonymousId;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error creating cart:', errorData);
    throw errorData;
  }

  return response.json();
}

export async function getCart({
  cartId,
  customerId,
}: { cartId?: string; customerId?: string } = {}): Promise<Cart> {
  const token =
    (await getToken('authToken'))?.access_token ||
    (await getToken('anonymousToken'))?.access_token;

  if (!token) {
    throw new Error('No authentication token available');
  }

  let url = `${EnvParams.VITE_CTP_API_URL}/${EnvParams.VITE_CTP_PROJECT_KEY}/me`;

  if (cartId) {
    url += `/carts/${cartId}`;
  } else if (customerId) {
    url += `/active-cart`;
  } else {
    throw new Error('Either cartId or customerId must be provided');
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error:', errorData);
    throw errorData;
  }

  return response.json();
}

export async function addLineItem(
  cartId: string,
  cartVersion: number,
  productId: string,
  variantId: number,
  quantity: number = 1
): Promise<Cart> {
  const body = {
    version: cartVersion,
    actions: [
      {
        action: 'addLineItem',
        productId,
        variantId,
        quantity,
      },
    ],
  };
  return sendHTTPRequest<Cart>(`/me/carts/${cartId}`, 'POST', body);
}

export async function removeLineItem(
  cartId: string,
  cartVersion: number,
  lineItemId: string,
  quantity?: number
): Promise<Cart> {
  const body = {
    version: cartVersion,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
        ...(quantity && { quantity }),
      },
    ],
  };
  return sendHTTPRequest<Cart>(`/me/carts/${cartId}`, 'POST', body);
}
