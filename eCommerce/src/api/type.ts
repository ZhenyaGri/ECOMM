export type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
};

export type AuthParams = {
  email: string;
  password: string;
  clientId: string;
  clientSecret: string;
  projectKey: string;
  authHost: string;
  scopes?: string;
};

export type ImportMetaEnv = {
  VITE_CTP_PROJECT_KEY: string;
  VITE_CTP_CLIENT_ID: string;
  VITE_CTP_CLIENT_SECRET: string;
  VITE_CTP_AUTH_URL: string;
  VITE_CTP_API_URL: string;
  VITE_CTP_SCOPES: string;
};

export type AuthErrorResponse = {
  statusCode: number;
  message: string;
  errors: Array<{ code: string; message: string }>;
  error: string;
  error_description?: string;
};
