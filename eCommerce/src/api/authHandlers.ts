import {
  ICreateAccount,
  ILogIn,
  IRemaindPass,
} from '../components/auth/type/auth-types';
import {
  createAnonymousToken,
  createAuthCustomer,
  getCustomerInfo,
  signUpCustomer,
} from './authService';
import { CustomerDraft } from './type';

export const handleLogin = async (
  email: string = '1@gmail.com',
  password: string = '11111'
): Promise<void> => {
  const response = await createAnonymousToken();
  if (response && 'access_token' in response) {
    console.log(response);
    const authResponse = await createAuthCustomer(email, password);
    console.log('LogIn Success:', authResponse);

    if (authResponse && authResponse.access_token) {
      const userInfo = await getCustomerInfo(authResponse.access_token);
      console.log('Customer Info:', userInfo);
    }
  }
};

export const handleSignup = async (
  customerDraft: CustomerDraft
): Promise<void> => {
  const response = await createAnonymousToken();

  if (response && 'access_token' in response) {
    const token = response.access_token;

    const signupResponse = await signUpCustomer(customerDraft, token);
    console.log('SignUp Success:', signupResponse);

    const authResponse = await createAuthCustomer(
      customerDraft.email,
      customerDraft.password
    );
    const authorizedToken = authResponse.access_token;

    const userInfo = await getCustomerInfo(authorizedToken);
    console.log('Customer Info:', userInfo);
  }
};

export function mapToCustomerDraft(
  data: ICreateAccount | ILogIn | IRemaindPass | undefined
): CustomerDraft {
  if (!isCreateAccount(data)) {
    throw new Error('Invalid data: expected ICreateAccount');
  }
  const CustomerDraft = {
    email: data.email!,
    password: data.password!,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.birthDate,
    addresses: [
      {
        streetName: data.street,
        city: data.city,
        postalCode: data.postCode,
        country: data.country || 'RU',
      },
    ],
  };
  console.log(CustomerDraft);
  return CustomerDraft;
}

function isCreateAccount(
  data: ICreateAccount | ILogIn | IRemaindPass | undefined
): data is ICreateAccount {
  return (
    !!data &&
    'firstName' in data &&
    'lastName' in data &&
    'birthDate' in data &&
    'street' in data &&
    'city' in data &&
    'postCode' in data &&
    'country' in data
  );
}
