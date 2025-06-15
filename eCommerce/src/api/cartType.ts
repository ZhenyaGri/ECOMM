import { ProductProjection } from './productsType';

export type Cart = {
  id: string;
  email: string;
  password: string;
  version: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  anonymousCart?: string;
  anonymousId: string;
  customerId: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses?: string;
  lineItems?: ProductProjection[];
};

export type CartDraft = {
  currency: string;
  customerEmail?: string;
  customerId?: string;
  middleName?: string;
  anonymousId?: string;
  shippingAddress?: string;
  billingAddress?: string;
};

export type LineItem = {
  action: 'addLineItem' | 'removeLineItem';
  productId: string;
  variantId: number;
  quantity: number;
};

export type CartUpdateAction = {
  action: string;
  [key: string]: unknown;
};
