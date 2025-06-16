import { getCustomerInfo } from '../../../api/authService';
import { Customer } from '../../../api/type';
import { countries } from '../../auth/data-list';
import {
  IUserDetales,
  IUserBillingAddress,
  IUserShippingAddress,
  IUserProfileDataValues,
} from '../types/types';

export const getUserProfileData = async (): Promise<
  IUserProfileDataValues | undefined
> => {
  const localStorageData = localStorage.getItem('authToken');

  if (localStorageData !== null) {
    const token = JSON.parse(localStorageData);
    const data = await getCustomerInfo(token.access_token);
    console.log(data);
    return await userData(data);
  }
};

const userData = async (data: Customer): Promise<IUserProfileDataValues> => {
  const userDetales: IUserDetales = {
    firstName: data.firstName,
    lastName: data.lastName,
    birthDate: data.dateOfBirth,
    email: data.email,
    pass: '',
  };

  const userBillingAddress: IUserBillingAddress = {
    billingStreet: data.addresses[0].streetName,
    billingCity: data.addresses[0].city,
    billingPostalCode: data.addresses[0].postalCode,
    billingCountry: transformData(data.addresses[0].country)!,
  };

  const userShippingAddress: IUserShippingAddress = {
    shippingStreet: data.addresses[1].streetName,
    shippingCity: data.addresses[1].city,
    shippingPostalCode: data.addresses[1].postalCode,
    shippingCountry: transformData(data.addresses[1].country)!,
  };

  const resultValues: IUserProfileDataValues = {
    userDetalesValue: Object.values(userDetales),
    userBillingAddressValue: Object.values(userBillingAddress),
    userShippingAddress: Object.values(userShippingAddress),
  };
  return resultValues;
};

const transformData = (value: string): string | undefined => {
  const country = countries.find((obj) => obj.code === value);
  return country ? country.name : undefined;
};

export const getUserDataObj = async (): Promise<Customer | undefined> => {
  const localStorageData = localStorage.getItem('authToken');

  if (localStorageData !== null) {
    const token = JSON.parse(localStorageData);
    const data = await getCustomerInfo(token.access_token);
    return data;
  }
};

getUserDataObj();
