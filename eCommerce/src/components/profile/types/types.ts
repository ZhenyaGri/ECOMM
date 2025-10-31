export interface IUserDetales {
  firstName: string | undefined;
  lastName: string | undefined;
  birthDate: string | undefined;
  email: string;
  pass: string;
}

export interface IUserBillingAddress {
  billingStreet: string | undefined;
  billingCity: string | undefined;
  billingPostalCode: string | undefined;
  billingCountry: string;
}

export interface IUserShippingAddress {
  shippingStreet: string | undefined;
  shippingCity: string | undefined;
  shippingPostalCode: string | undefined;
  shippingCountry: string;
}

export interface IUserProfileDataValues {
  userDetalesValue: string[];
  userBillingAddressValue: string[];
  userShippingAddress: string[];
}
