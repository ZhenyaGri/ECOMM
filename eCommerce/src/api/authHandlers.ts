import { IUserData } from '../components/auth/type/auth-types';
import {
  createAnonymousToken,
  createAuthCustomer,
  getCustomerInfo,
  signUpCustomer,
} from './authService';
import { CustomerDraft, TokenResponse } from './type';

export const handleLogin = async (
  email: string = '1@gmail.com',
  password: string = '11111'
): Promise<TokenResponse | null> => {
  const response = await getToken('anonymousToken');
  if (response && 'access_token' in response) {
    const authResponse = await createAuthCustomer(email, password);
    console.log('LogIn Success:', authResponse);

    if (authResponse && authResponse.access_token) {
      const userInfo = await getCustomerInfo(authResponse.access_token);
      console.log('Customer Info:', userInfo);
    }
    return authResponse;
  }
  return null;
};

export const handleSignup = async (
  customerDraft: CustomerDraft
): Promise<TokenResponse | null> => {
  const response = await getToken('anonymousToken');

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
    return authResponse;
  }
  return null;
};

export function mapToCustomerDraft(data: IUserData | undefined): CustomerDraft {
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

function isCreateAccount(data: IUserData | undefined): data is IUserData {
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

export function setToken(token: TokenResponse, keyToken: string): void {
  localStorage.setItem(keyToken, JSON.stringify(token));
}

export async function getToken(
  keyToken: 'anonymousToken' | 'authToken'
): Promise<TokenResponse | null> {
  let result = null;
  const token = localStorage.getItem(keyToken);
  if (token) {
    result = JSON.parse(token);
  } else {
    const anonymousToken = await createAnonymousToken();
    if (keyToken === 'anonymousToken') {
      if (anonymousToken) {
        setToken(anonymousToken, keyToken);
        result = anonymousToken;
      }
    }
  }
  return result;
}

export async function removeToken(): Promise<void> {
  localStorage.removeItem('authToken');
  getToken('anonymousToken');
}
