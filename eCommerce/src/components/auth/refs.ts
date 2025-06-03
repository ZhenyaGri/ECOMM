import { useRef } from 'react';
import { IRefs } from './type/auth-types';

export const useRefs = (): IRefs => {
  const warnRefAccount = {
    firstName: useRef(null),
    lastName: useRef(null),
    birthDate: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  const warnRefAddress = {
    street: useRef(null),
    city: useRef(null),
    postCode: useRef(null),
    country: useRef(null),
  };

  const warnRefShiping = {
    shippingStreet: useRef(null),
    shippingCity: useRef(null),
    shippingPostCode: useRef(null),
    shippingCountry: useRef(null),
  };

  const warnRefLogIn = {
    email: useRef(null),
    password: useRef(null),
  };

  const warnRefRestoreUser = {
    email: useRef(null),
  };
  return {
    warnRefAccount,
    warnRefAddress,
    warnRefShiping,
    warnRefLogIn,
    warnRefRestoreUser,
  };
};
