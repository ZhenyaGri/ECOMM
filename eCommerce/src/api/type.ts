export type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
};

export type AuthParams = {
  email: string;
  password: string;
  clientId: string;
  clientSecret: string;
  projectKey: string;
  authHost: string;
  scopes?: string;
};

export type ImportMetaEnv = {
  VITE_CTP_PROJECT_KEY: string;
  VITE_CTP_CLIENT_ID: string;
  VITE_CTP_CLIENT_SECRET: string;
  VITE_CTP_AUTH_URL: string;
  VITE_CTP_API_URL: string;
  VITE_CTP_SCOPES: string;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  errors: Array<{ code: string; message: string }>;
};

export type ErrorObject = {
  code: number;
  message: string;
};

export type AuthErrorResponse = ErrorResponse & {
  error?: string;
  error_description?: string;
};

export type CustomerDraft = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  anonymousCart?: string;
  anonymousId?: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses?: string;
  defaultShippingAddress?: number;
  shippingAddresses?: Array<number>;
  defaultBillingAddress?: number;
  billingAddresses?: Array<number>;
};

export type Customer = {
  id: string;
  version: number;
  email: string;
  addresses: Array<Address>;
  isEmailVerified: boolean;
  stores: Array<{ key: string; typeId: string }>;
  password?: string;
  key?: string;
  customerNumber?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  dateOfBirth?: string;
};

export type Address = {
  country: string;
  key?: string;
  id?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  additionalStreetInfo?: string;
  postalCode: string;
  city?: string;
  region?: string;
  state?: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
};

export type Cart = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  anonymousCart?: string;
  anonymousId?: string;
  dateOfBirth?: string;
  companyName?: string;
  vatId?: string;
  addresses?: string;
};

export type CustomerSignInResult = {
  customer: Customer;
  cart?: Cart;
};
