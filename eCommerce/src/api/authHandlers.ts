import { IUserData, INewUser } from '../components/auth/type/auth-types';
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

    if (authResponse && authResponse.access_token) {
      const userInfo = await getCustomerInfo(authResponse.access_token);
      localStorage.setItem('userId', userInfo.id);
      localStorage.removeItem('cartId');
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

    await signUpCustomer(customerDraft, token);

    const authResponse = await createAuthCustomer(
      customerDraft.email,
      customerDraft.password
    );
    const authorizedToken = authResponse.access_token;

    const userInfo = await getCustomerInfo(authorizedToken);
    localStorage.setItem('userId', userInfo.id);
    localStorage.removeItem('cartId');

    return authResponse;
  }
  return null;
};

export function mapToCustomerDraft(data: IUserData | undefined): CustomerDraft {
  if (!isCreateAccount(data)) {
    throw new Error(
      `Please check your input: some fields are missing or invalid`
    );
  }
  const CustomerDraft = {
    email: data.email!,
    password: data.password!,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    addresses: [
      //billing address
      {
        streetName: data.street,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country || 'RU',
      },
      //shipping address
      {
        streetName: data.shippingStreet,
        city: data.shippingCity,
        postalCode: data.shippingPostalCode,
        country: data.shippingCountry || 'RU',
      },
    ],
  };
  return CustomerDraft;
}

function isCreateAccount(data: IUserData | undefined): data is INewUser {
  return (
    !!data &&
    'firstName' in data &&
    'lastName' in data &&
    'dateOfBirth' in data &&
    'street' in data &&
    'city' in data &&
    'postalCode' in data &&
    'country' in data &&
    'shippingStreet' in data &&
    'shippingCity' in data &&
    'shippingPostalCode' in data &&
    'shippingCountry' in data
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
  localStorage.removeItem('userId');
  localStorage.removeItem('cartId');
  getToken('anonymousToken');
}
