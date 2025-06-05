import { getValidInputValue } from '../../auth/form-handler';
import { Customer, Address } from '../../../api/type';
import { getUserDataObj } from './get-data';

type IFieldGroups = {
  personal: string[];
  billing: string[];
  shipping: string[];
};

type PersonalField =
  | 'firstName'
  | 'lastName'
  | 'dateOfBirth'
  | 'email'
  | 'password';
type BillingField = 'street' | 'city' | 'postalCode' | 'country';
type ShippingField =
  | 'shippingStreet'
  | 'shippingCity'
  | 'shippingPostalCode'
  | 'shippingCountry';

const fieldGroups: IFieldGroups = {
  personal: ['firstName', 'lastName', 'dateOfBirth', 'email', 'password'],
  billing: ['street', 'city', 'postalCode', 'country'],
  shipping: [
    'shippingStreet',
    'shippingCity',
    'shippingPostalCode',
    'shippingCountry',
  ],
};

function isPersonalField(key: string): key is PersonalField {
  return fieldGroups.personal.includes(key);
}

function isBillingField(key: string): key is BillingField {
  return fieldGroups.billing.includes(key);
}

function isShippingField(key: string): key is ShippingField {
  return fieldGroups.shipping.includes(key);
}

const billingMap: Record<BillingField, keyof Address> = {
  street: 'streetName',
  city: 'city',
  postalCode: 'postalCode',
  country: 'country',
};

const shippingMap: Record<ShippingField, BillingField> = {
  shippingStreet: 'street',
  shippingCity: 'city',
  shippingPostalCode: 'postalCode',
  shippingCountry: 'country',
};

let customerData: Customer | undefined = undefined;

export async function initCustomerData(): Promise<void> {
  customerData = await getUserDataObj();
  if (!customerData) throw new Error('Customer data not found');
}

const validProfileInputValues = (
  value: string,
  inputType: string,
  ref: HTMLHeadingElement
): string | undefined => {
  return getValidInputValue(value, inputType, ref);
};

export const createInputObj = async (
  value: string,
  inputType: string,
  ref: HTMLHeadingElement
): Promise<void> => {
  if (!customerData) {
    await initCustomerData();
  }
  if (!customerData) return;

  const validValue = validProfileInputValues(value, inputType, ref);
  if (!validValue) return;

  if (isPersonalField(inputType)) {
    // customerData точно есть и inputType это PersonalField
    customerData[inputType] = validValue;
  }

  if (isBillingField(inputType)) {
    if (!customerData.addresses[0]) {
      customerData.addresses[0] = { country: 'RU' };
    }
    const field = billingMap[inputType];
    customerData.addresses[0][field] = validValue;
  }

  if (isShippingField(inputType)) {
    if (!customerData.addresses[1]) {
      customerData.addresses[1] = { country: 'RU' };
    }
    const billingField = shippingMap[inputType];
    const addressField = billingMap[billingField];
    customerData.addresses[1][addressField] = validValue;
  }

  console.log('Updated customerData:', customerData);
};

type CustomerAction =
  | { action: 'setFirstName'; firstName: string }
  | { action: 'setLastName'; lastName: string }
  | { action: 'setDateOfBirth'; dateOfBirth: string }
  | { action: 'changeEmail'; email: string }
  | { action: 'changeAddress'; addressId: string; address: Address }
  | { action: 'changePassword'; currentPassword: string; newPassword: string };

function buildActionsFromCustomerData(
  customerData: Customer,
  newPassword?: string,
  oldPassword?: string
): CustomerAction[] {
  const actions: CustomerAction[] = [];

  if (customerData.firstName)
    actions.push({ action: 'setFirstName', firstName: customerData.firstName });

  if (customerData.lastName)
    actions.push({ action: 'setLastName', lastName: customerData.lastName });

  if (customerData.dateOfBirth)
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: customerData.dateOfBirth,
    });

  if (customerData.email)
    actions.push({ action: 'changeEmail', email: customerData.email });

  if (customerData.addresses?.[0]?.id) {
    actions.push({
      action: 'changeAddress',
      addressId: customerData.addresses[0].id,
      address: customerData.addresses[0],
    });
  }

  if (customerData.addresses?.[1]?.id) {
    actions.push({
      action: 'changeAddress',
      addressId: customerData.addresses[1].id,
      address: customerData.addresses[1],
    });
  }

  if (newPassword && oldPassword) {
    actions.push({
      action: 'changePassword',
      currentPassword: oldPassword,
      newPassword: newPassword,
    });
  }

  return actions;
}

export async function updateCustomer(): Promise<Customer> {
  if (!customerData) {
    await initCustomerData();
  }
  if (!customerData) throw new Error('Customer data is not initialized');

  const tokenData = localStorage.getItem('authToken');
  if (!tokenData) throw new Error('Token not found in localStorage');

  const token = JSON.parse(tokenData).access_token;

  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

  const actions = buildActionsFromCustomerData(customerData);

  const version = customerData.version || 0;

  const response = await fetch(
    `https://api.us-central1.gcp.commercetools.com/${projectKey}/me`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const updatedCustomer: Customer = await response.json();

  customerData = updatedCustomer;

  console.log('Customer successfully updated:', customerData);

  return customerData;
}
