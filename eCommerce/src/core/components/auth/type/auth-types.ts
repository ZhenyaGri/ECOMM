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
