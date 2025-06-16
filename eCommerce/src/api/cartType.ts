export type Cart = {
  id: string;
  email: string;
  password: string;
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
