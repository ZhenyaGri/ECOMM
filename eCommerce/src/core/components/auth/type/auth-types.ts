export interface ILogIn {
  email: string | undefined;
  password: string | undefined;
}

export interface ICreateAccount {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export interface IRemaindPass {
  email: string | undefined;
}

export interface IWarnRefObj {
  firstName?: React.RefObject<HTMLHeadingElement | null>;
  lastName?: React.RefObject<HTMLHeadingElement | null>;
  email?: React.RefObject<HTMLHeadingElement | null>;
  password?: React.RefObject<HTMLHeadingElement | null>;
}

export interface IErrorField {
  key: string;
  message: string;
}
