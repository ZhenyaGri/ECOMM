import {
  TokenResponse,
  CustomerDraft,
  Customer,
  AuthParams,
  ImportMetaEnv,
  CustomerSignInResult,
} from './type';

const EnvParams: ImportMetaEnv = {
  VITE_CTP_PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY,
  VITE_CTP_CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET,
  VITE_CTP_AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL,
  VITE_CTP_API_URL: import.meta.env.VITE_CTP_API_URL,
  VITE_CTP_SCOPES: import.meta.env.VITE_CTP_SCOPES,
};

const credentials = btoa(
  `${EnvParams.VITE_CTP_CLIENT_ID}:${EnvParams.VITE_CTP_CLIENT_SECRET}`
);

async function authPasswordFlow(params: AuthParams): Promise<TokenResponse> {
  const { email, password, projectKey, authHost, scopes } = params;

  const url = `${authHost}/oauth/${projectKey}/customers/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
      scope: scopes || `manage_my_profile:${projectKey}`,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return await response.json();
}

export async function refreshToken(
  refreshToken: string
): Promise<TokenResponse> {
  const url = `${EnvParams.VITE_CTP_AUTH_URL}/oauth/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error refreshing token:', errorData);
    throw errorData;
  }

  return await response.json();
}

export async function createAuthCustomer(
  email: string,
  password: string
): Promise<TokenResponse> {
  return authPasswordFlow({
    email: email,
    password: password,
    clientId: EnvParams.VITE_CTP_CLIENT_ID,
    clientSecret: EnvParams.VITE_CTP_CLIENT_SECRET,
    projectKey: EnvParams.VITE_CTP_PROJECT_KEY,
    authHost: EnvParams.VITE_CTP_AUTH_URL,
    scopes: EnvParams.VITE_CTP_SCOPES,
  });
}

export async function createAnonymousToken(): Promise<TokenResponse | null> {
  const authHost = EnvParams.VITE_CTP_AUTH_URL;
  const projectKey = EnvParams.VITE_CTP_PROJECT_KEY;
  const scope = EnvParams.VITE_CTP_SCOPES;

  console.log(authHost, projectKey, scope);

  const url = `${authHost}/oauth/${projectKey}/anonymous/token`;

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: scope,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }
    return response.json();
  } catch (error) {
    console.error('Error getting token:', JSON.stringify(error, null, 2));
    return null;
  }
}

export async function signUpCustomer(
  customer: CustomerDraft,
  token: string
): Promise<CustomerSignInResult> {
  const apiUrl = EnvParams.VITE_CTP_API_URL;
  const projectKey = EnvParams.VITE_CTP_PROJECT_KEY;

  const response = await fetch(`${apiUrl}/${projectKey}/me/signup`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error while registering client:', errorData);
    throw errorData;
  }

  return await response.json();
}

export async function getClientCredentialsToken(): Promise<TokenResponse> {
  const url = `${EnvParams.VITE_CTP_AUTH_URL}/oauth/token`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: `manage_customers:${EnvParams.VITE_CTP_PROJECT_KEY}`,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return await response.json();
}

export async function getCustomerInfo(token: string): Promise<Customer> {
  const response = await fetch(
    `${EnvParams.VITE_CTP_API_URL}/${EnvParams.VITE_CTP_PROJECT_KEY}/me`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching customer data:', errorData);
    throw errorData;
  }
  return await response.json();
}
