import {
  createAnonymousToken,
  //createAuthCustomer,
  signUpCustomer,
} from './authService';

export const handleLogin = async (): Promise<void> => {
  try {
    // for Auth Token
    //const response = await createAuthCustomer('1@gmail.com', '11111');
    const response = await createAnonymousToken();
    if (response && 'access_token' in response) {
      console.log(response.access_token);
      const token = response.access_token;
      const signUp = await signUpCustomer(
        {
          email: '1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'secret123',
        },
        token
      );
      console.log(signUp);
    }
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error(`Error: ${(error as { message: string }).message}`);
    } else {
      console.error('Unknown error', error);
    }
  }
};
