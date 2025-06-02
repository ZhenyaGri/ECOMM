import {
  authUserData,
  defaultCopyAuthUserData,
  errorFields,
  validationData,
} from './data-list';
import { IUserData, IWarnRefObj } from './type/auth-types';

let validformDataObj: IUserData | undefined = undefined;

//function to get object with data after validation
export const getUserDataObj = (): IUserData | undefined => {
  if (validformDataObj) {
    const objValues = Object.values(validformDataObj);
    const isObjValues = objValues.every((val) => val !== undefined);
    if (isObjValues) {
      return validformDataObj;
    } else {
      return undefined;
    }
  }
};

// input handler cllaer
export const inputHandler = (
  e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
  inputType: keyof IUserData,
  userDataObj: IUserData | undefined,
  ref: HTMLHeadingElement | null
): void => {
  const element = e.target;
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement
  ) {
    const value = element.value;
    updateFormState(value, inputType, userDataObj, ref);
  }
};

//formHandler main func to get whole data obj
const updateFormState = (
  value: string,
  inputType: keyof IUserData,
  userDataObj: IUserData | undefined,
  ref: HTMLHeadingElement | null
): void => {
  const inputVal = getValidInputValue(value, inputType, ref);
  if (userDataObj) {
    if (inputType in userDataObj) {
      userDataObj[inputType] = inputVal;
      validformDataObj = userDataObj;
    }
  }
};

// validation engine
const getValidInputValue = (
  value: string,
  inputType: string,
  ref: HTMLHeadingElement | null
): string | undefined => {
  if (!value || !ref || value.length === 0) {
    return undefined;
  }
  const validationRule = validationData.find(
    (dataObj) => dataObj.type === inputType
  );
  if (!validationRule) {
    return undefined;
  }
  const isValid = validationRule.isValid(value);
  if (isValid) {
    ref.textContent = '';
    return value;
  } else {
    ref.textContent = validationRule.err;
    return undefined;
  }
};

// error message render
export const showErrorMessages = (warnRefObj: IWarnRefObj): void => {
  const keys = Object.keys(warnRefObj);
  const values = Object.values(warnRefObj);
  const filteredErrFields = errorFields.filter((f) => keys.includes(f.key));
  const userDataObjValues: string[] | undefined = validformDataObj
    ? Object.values(validformDataObj)
    : undefined;
  values.forEach((val, i) => {
    if (!validformDataObj) {
      if (val && val.current) {
        val.current.textContent = filteredErrFields[i].message;
      }
    } else {
      if (userDataObjValues) {
        if (!userDataObjValues[i]) {
          if (val && val.current) {
            val.current.textContent = filteredErrFields[i].message;
          }
        } else {
          if (val && val.current) {
            val.current.textContent = '';
          }
        }
      }
    }
  });
};

export const setShippingAddress = (
  userDataObj: IUserData | undefined,
  isShippingAddressVisible: boolean
): void => {
  if (isShippingAddressVisible) {
    return;
  } else {
    if (userDataObj) {
      const street = userDataObj.street;
      const city = userDataObj.city;
      const postalAddress = userDataObj.postCode;
      const country = userDataObj.country;

      userDataObj.shippingStreet = street;
      userDataObj.shippingCity = city;
      userDataObj.shippingPostCode = postalAddress;
      userDataObj.shippingCountry = country;
    }
  }
};

export const dataReset = (): void => {
  Object.assign(authUserData, defaultCopyAuthUserData);
  console.log(authUserData);
};