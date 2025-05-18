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

    console.log(authResponse);
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

    const userInfo = await getCustomerInfo(token);
    console.log('Customer Info:', userInfo);
  }
};
