import { IUserData } from '../components/auth/type/auth-types';
import {
  createAnonymousToken,
  createAuthCustomer,
  getCustomerInfo,
  refreshToken,
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

function isTokenExpired(token: TokenResponse): boolean {
  if (!token.created_at) return true;
  const expirationTime =
    Number(token.created_at) + Number(token.expires_in) * 1000;
  return Date.now() > expirationTime - 60000;
}

export function setToken(token: TokenResponse, keyToken: string): void {
  const tokenWithTimestamp = {
    ...token,
    created_at: Date.now(),
  };
  localStorage.setItem(keyToken, JSON.stringify(tokenWithTimestamp));
}

export async function getToken(
  keyToken: 'anonymousToken' | 'authToken'
): Promise<TokenResponse | null> {
  const token = localStorage.getItem(keyToken);
  if (token) {
    const parsedToken = JSON.parse(token);

    if (!isTokenExpired(parsedToken)) {
      return parsedToken;
    }
    localStorage.removeItem(keyToken);

    if (parsedToken.refresh_token) {
      try {
        const newToken = await refreshToken(parsedToken.refresh_token);
        setToken(newToken, keyToken);
        return newToken;
      } catch (error) {
        console.error('Refresh token failed:', error);
        localStorage.removeItem('authToken');
      }
    }
  } else if (keyToken === 'anonymousToken') {
    const anonymousToken = await createAnonymousToken();
    if (anonymousToken) {
      setToken(anonymousToken, keyToken);
      return anonymousToken;
    }
  }
  return null;
}

export async function removeToken(): Promise<void> {
  localStorage.removeItem('authToken');
  getToken('anonymousToken');
}
