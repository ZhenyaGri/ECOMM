import { ICreateAccount } from './type/auth-types';

 const defaultNewUserObj = function (
  isShipmentAddress: boolean
): ICreateAccount{
  if (isShipmentAddress) {
    return {
      firstName: undefined,
      lastName: undefined,
      birthDate: undefined,
      email: undefined,
      password: undefined,

      street: undefined,
      city: undefined,
      postCode: undefined,
      country: undefined,

      shippingStreet: undefined,
      shippingCity: undefined,
      shippingPostCode: undefined,
      shippingCountry: undefined,
    };
  } else {
    return {
      firstName: undefined,
      lastName: undefined,
      birthDate: undefined,
      email: undefined,
      password: undefined,

      street: undefined,
      city: undefined,
      postCode: undefined,
      country: undefined,
    };
  }
};

export default  defaultNewUserObj