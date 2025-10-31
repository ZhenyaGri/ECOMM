export interface INewUser {
  firstName: string | undefined;
  lastName: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  password: string | undefined;

  street: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;

  shippingStreet: string | undefined;
  shippingCity: string | undefined;
  shippingPostalCode: string | undefined;
  shippingCountry: string | undefined;
}
export interface IAddressDefoult {
  isBillingAddressDef: boolean;
  isShippingAddress: boolean;
}

export interface ILogIn {
  email: string | undefined;
  password: string | undefined;
}

export interface IRestoreUser {
  email: string | undefined;
}

export interface IAuthUserData {
  newUser: INewUser | undefined;
  addressDefaults: IAddressDefoult;
  logIn: ILogIn | undefined;
  restorUser: IRestoreUser | undefined;
}

export type IUserData = Partial<INewUser & ILogIn & IRestoreUser>;

export interface IWarnRefObj {
  firstName?: React.RefObject<HTMLHeadingElement | null>;
  lastName?: React.RefObject<HTMLHeadingElement | null>;
  dateOfBirth?: React.RefObject<HTMLHeadingElement | null>;
  email?: React.RefObject<HTMLHeadingElement | null>;
  password?: React.RefObject<HTMLHeadingElement | null>;

  street?: React.RefObject<HTMLHeadingElement | null>;
  city?: React.RefObject<HTMLHeadingElement | null>;
  postalCode?: React.RefObject<HTMLHeadingElement | null>;
  country?: React.RefObject<HTMLHeadingElement | null>;

  shippingStreet?: React.RefObject<HTMLHeadingElement | null>;
  shippingCity?: React.RefObject<HTMLHeadingElement | null>;
  shippingPostalCode?: React.RefObject<HTMLHeadingElement | null>;
  shippingCountry?: React.RefObject<HTMLHeadingElement | null>;
}

export interface IRefs {
  warnRefAccount: IWarnRefObj;
  warnRefAddress: IWarnRefObj;
  warnRefShiping: IWarnRefObj;
  warnRefLogIn: IWarnRefObj;
  warnRefRestoreUser: IWarnRefObj;
}

export interface IErrorField {
  key: string;
  message: string;
}

export interface IValidationData {
  type: string;
  err: string;
  isValid: boolean;
}
export type AccountFieldKeys =
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'email'
  | 'password'
  | 'street'
  | 'city'
  | 'postalCode'
  | 'country'
  | 'shippingStreet'
  | 'shippingCity'
  | 'shippingPostalCode'
  | 'shippingCountry';

export interface IFieldObj {
  title?: string;
  type: AccountFieldKeys;
  inputId: string;
  inputType: string;
  placeholder?: string;
  classNameInput: string;
  classNameItem: string;
  classNameWarning: string;
}
