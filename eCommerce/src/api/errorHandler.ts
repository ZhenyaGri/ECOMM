import { ErrorObject, ErrorResponse } from './type';

export function parseError(error: unknown): ErrorObject | ErrorResponse {
  const unknownError = {
    code: '0',
    message: 'An unknown error occurred. Please try again.',
  };
  if (!error || typeof error !== 'object') {
    return unknownError;
  } else if ('errors' in error) {
    const errResponse = error as ErrorResponse;
    return errResponse;
  } else if ('message' in error) {
    const authError = error as ErrorObject;
    return authError;
  }
  return unknownError;
}
