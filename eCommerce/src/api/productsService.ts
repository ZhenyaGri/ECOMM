import { getToken } from './authHandlers';
import {
  ProductProjectionPagedQueryResponse,
  PublishedProductsParams,
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

export async function fetchProductsWithFacets(
  filterParams: string[],
  otherParams: FetchProductsParams = {}
): Promise<ProductProjectionPagedQueryResponse> {
  const params: FetchProductsParams = {
    ...otherParams,
    limit: otherParams.limit || 20,
    where: otherParams.where || ['published = true'],
  };

  if (filterParams.length > 0) {
    const attributeFilters: string[] = [];
    const categoryFilters: string[] = [];

    filterParams.forEach((filter) => {
      if (filter.startsWith('categories.')) {
        categoryFilters.push(filter);
      } else {
        attributeFilters.push(filter);
      }
    });

    if (attributeFilters.length > 0) {
      const filterGroups: Record<string, string[]> = {};

      attributeFilters.forEach((filter) => {
        const cleanFilter = filter.replace(/^variants\.attributes\./, '');
        const [attr, value] = cleanFilter.split(':');

        if (!attr) return;

        if (!filterGroups[attr]) {
          filterGroups[attr] = [];
        }

        if (value) {
          const cleanValue = value.replace(/^"+|"+$/g, '');
          filterGroups[attr].push(cleanValue);
        }
      });

      const attributeFilterStrings = Object.entries(filterGroups).map(
        ([attr, values]) => {
          if (values.length > 0) {
            return `variants.attributes.${attr}:"${values.join('","')}"`;
          }
          return `variants.attributes.${attr}`;
        }
      );
      params.filter = [...(params.filter || []), ...attributeFilterStrings];
    }

    if (categoryFilters.length > 0) {
      params.filter = [...(params.filter || []), ...categoryFilters];
    }
  }

  return fetchProducts(params, '/search');
}
