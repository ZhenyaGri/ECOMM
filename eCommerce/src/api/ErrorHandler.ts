import { ErrorObject, ErrorResponse } from './type';

export function parseError(error: unknown): string {
  console.log(error);
  if (!error || typeof error !== 'object') {
    return 'An unknown error occurred. Please try again.';
  } else if ('errors' in error) {
    const errResponse = error as ErrorResponse;
    return errResponse.errors.map((error) => error.message).join(' ');
  } else if ('message' in error) {
    const authError = error as ErrorObject;
    return authError.message;
  }
  return 'An unknown error occurred. Please try again.';
}
