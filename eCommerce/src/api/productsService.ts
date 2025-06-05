import { getToken } from './authHandlers';
import {
  ProductProjectionPagedQueryResponse,
  PublishedProductsParams,
  ProductProjection,
} from './productsType';
import { ImportMetaEnv } from './type';
import { FetchProductsParams } from './type';

const EnvParams: ImportMetaEnv = {
  VITE_CTP_PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY,
  VITE_CTP_CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET,
  VITE_CTP_AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL,
  VITE_CTP_API_URL: import.meta.env.VITE_CTP_API_URL,
  VITE_CTP_SCOPES: import.meta.env.VITE_CTP_SCOPES,
};

export async function fetchProducts(
  params: FetchProductsParams = {},
  PathURL: string
): Promise<ProductProjectionPagedQueryResponse> {
  const token =
    (await getToken('authToken'))?.access_token ||
    (await getToken('anonymousToken'))?.access_token;

  const url = new URL(
    `${EnvParams.VITE_CTP_API_URL}/${EnvParams.VITE_CTP_PROJECT_KEY}/product-projections${PathURL}`
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, v));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  });

  const str = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url.toString(), str);

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}

export async function getPublishedProducts(
  params: PublishedProductsParams = {},
  sortByPrice: boolean = false
): Promise<ProductProjectionPagedQueryResponse> {
  const defaultParams = {
    limit: 20,
    where: ['published = true'],
  };
  const queryParams = params ? { ...params } : { ...defaultParams };

  return fetchProducts(queryParams, sortByPrice ? '/search' : '');
}

export async function getProductById(
  productId: string
): Promise<ProductProjection> {
  const token =
    (await getToken('authToken'))?.access_token ||
    (await getToken('anonymousToken'))?.access_token;

  const url = `${EnvParams.VITE_CTP_API_URL}/${EnvParams.VITE_CTP_PROJECT_KEY}/product-projections/${productId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}
