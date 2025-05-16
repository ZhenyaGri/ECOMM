import { createAuthCustomer } from './authService';

export const handleLogin = async (): Promise<void> => {
  try {
    const response = await createAuthCustomer('1@gmail.com', '11111');
    // for Anonymous Token
    //const response = await createAnonymousToken();
    if (response && 'access_token' in response) {
      console.log(response.access_token);
    }
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error(`Error: ${(error as { message: string }).message}`);
    } else {
      console.error('Unknown error', error);
    }
  }
};
