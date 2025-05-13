import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type Client, // Required for sending HTTP requests
} from '@commercetools/ts-client';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
//const scopes = [import.meta.env.CTP_SCOPES];

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  httpClient: fetch,
};

// Configure authMiddlewareOptions
const anonymousOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes: [
    `manage_my_profile:${projectKey}`,
    `create_anonymous_token:${projectKey}`,
  ],
  httpClient: fetch,
};

export const anonymousClient = new ClientBuilder()
  .withAnonymousSessionFlow(anonymousOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const createPasswordClient = (
  username: string,
  password: string
): Client => {
  const passwordOptions: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username,
        password,
      },
    },
    scopes: [`manage_my_profile:${projectKey}`],
    httpClient: fetch,
  };

  return new ClientBuilder()
    .withPasswordFlow(passwordOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};
