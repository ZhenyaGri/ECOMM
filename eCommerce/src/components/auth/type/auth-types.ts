export interface ILogIn {
  email: string | undefined;
  password: string | undefined;
}

export interface ICreateAccount {
  firstName?: string | undefined;
  lastName?: string | undefined;
  birthDate?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;

  street?: string | undefined;
  city?: string | undefined;
  postCode?: string | undefined;
  country?: string | undefined;

  shippingStreet?: string | undefined;
  shippingCity?: string | undefined;
  shippingPostCode?: string | undefined;
  shippingCountry?: string | undefined;
}

export interface IRemaindPass {
  email: string | undefined;
}

export interface IWarnRefObj {
  firstName?: React.RefObject<HTMLHeadingElement | null>;
  lastName?: React.RefObject<HTMLHeadingElement | null>;
  birthDate?: React.RefObject<HTMLHeadingElement | null>;
  email?: React.RefObject<HTMLHeadingElement | null>;
  password?: React.RefObject<HTMLHeadingElement | null>;

  street?: React.RefObject<HTMLHeadingElement | null>;
  city?: React.RefObject<HTMLHeadingElement | null>;
  postCode?: React.RefObject<HTMLHeadingElement | null>;
  country?: React.RefObject<HTMLHeadingElement | null>;

  shippingStreet?: React.RefObject<HTMLHeadingElement | null>;
  shippingCity?: React.RefObject<HTMLHeadingElement | null>;
  shippingPostCode?: React.RefObject<HTMLHeadingElement | null>;
  shippingCountry?: React.RefObject<HTMLHeadingElement | null>;
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

type AccountFieldKey =
  | 'firstName'
  | 'lastName'
  | 'birthDate'
  | 'email'
  | 'password'
  | 'street'
  | 'city'
  | 'postCode'
  | 'country'
  | 'shippingStreet'
  | 'shippingCity'
  | 'shippingPostCode'
  | 'shippingCountry';

export interface IFieldObj {
  type: AccountFieldKey;
  inputId: string;
  inputType: string;
  placeholder?: string;
  classNameInput: string;
  classNameItem: string;
  classNameWarning: string;
}
