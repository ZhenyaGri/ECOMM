import {
  createAnonymousToken,
  createAuthCustomer,
  getCustomerInfo,
  //signUpCustomer,
} from './authService';

export const handleLogin = async (): Promise<void> => {
  try {
    const response = await createAnonymousToken();
    if (response && 'access_token' in response) {
      console.log(response);
      const authResponse = await createAuthCustomer('1@gmail.com', '11111');

      console.log(authResponse);
      if (authResponse && authResponse.access_token) {
        const userInfo = await getCustomerInfo(authResponse.access_token);
        console.log('Customer Info:', userInfo);
      }
    }
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error(`Error: ${(error as { message: string }).message}`);
    } else {
      console.error('Unknown error', error);
    }
  }
};
