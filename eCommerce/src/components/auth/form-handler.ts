import { errorFields } from './data-list';
import {
  ICreateAccount,
  ILogIn,
  IRemaindPass,
  IWarnRefObj,
} from './type/auth-types';

let userDataObj: ICreateAccount | ILogIn | IRemaindPass | undefined = undefined;

//function to get object with data after validation
export const getUserDataObj = ():
  | ICreateAccount
  | ILogIn
  | IRemaindPass
  | undefined => {
  if (userDataObj) {
    const objValues = Object.values(userDataObj);
    const isObjValues = objValues.every((val) => val !== undefined);
    if (isObjValues) {
      console.log(userDataObj);
      return userDataObj;
    } else {
      console.error('obj is undefined or somting went wrong');
      return undefined;
    }
  }
};
// input handler cllaer
export const inputHandler = (
  e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
  type: string,
  setState: React.Dispatch<React.SetStateAction<ILogIn | IRemaindPass>>,
  ref: HTMLHeadingElement | null
): void => {
  const element = e.target;
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement
  ) {
    const value = element.value;
    updateFormState(value, type, setState, ref);
  }
};

//formHandler main func to get whole data obj
const updateFormState = (
  value: string,
  inputType: string,
  setState: React.Dispatch<React.SetStateAction<ILogIn | IRemaindPass>>,
  ref: HTMLHeadingElement | null
): void => {
  const inputVal = getValidInputValue(value, inputType, ref);
  setState((prev) => {
    const stateObj = { ...prev, [inputType]: inputVal };
    userDataObj = { ...stateObj };
    //console.log(userDataObj);
    return stateObj;
  });
};

//function to get valid value from inpue
const getValidInputValue = (
  value: string,
  inputType: string,
  ref: HTMLHeadingElement | null
): string | undefined => {
  if (value && ref) {
    if (
      inputType === 'firstName' ||
      inputType === 'lastName' ||
      inputType === 'city' ||
      inputType === 'street'
    ) {
      if (value.length > 0) {
        ref.textContent = '';
        return value;
      } else {
        if (inputType === 'firstName') {
          ref.textContent =
            'First name: Must contain at least one character and no special characters or numbers';
        }
        if (inputType === 'lastName') {
          ref.textContent =
            'Last name: Must contain at least one character and no special characters or numbers';
        }
        if (inputType === 'street') {
          ref.textContent = 'Street: Must contain at least one character';
        }
        if (inputType === 'city') {
          ref.textContent =
            'City: Must contain at least one character and no special characters or numbers';
        }
        return undefined;
      }
    } else if (inputType === 'birthDate') {
      const isValid: boolean =
        /^(19\d{2}|200\d|201[0-2])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
          value
        );
      if (isValid) {
        ref.textContent = '';
        return value;
      } else {
        ref.textContent =
          'Date of birth: A valid date input ensuring the user is above a certain age (e.g., 13 years old or older)';
        return undefined;
      }
    } else if (inputType === 'email') {
      const isValid: boolean = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/.test(value);
      if (isValid) {
        ref.textContent = '';
        return value;
      } else {
        ref.textContent =
          'Email: A properly formatted email address (e.g., example@email.com)';
        return undefined;
      }
    } else if (inputType === 'password') {
      const isPassValid: boolean = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(
        value
      );
      if (isPassValid) {
        ref.textContent = '';
        return value;
      } else {
        ref.textContent =
          'Password: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number';
        return undefined;
      }
    } else if (inputType === 'postCode') {
      const isValid = /^[A-Za-z0-9\s-]{3,10}$/.test(value);
      if (isValid) {
        ref.textContent = '';
        return value;
      } else {
        ref.textContent =
          'Postal code: Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)';
        return undefined;
      }
    } else if (inputType === 'country') {
      ref.textContent = '';
      return value;
    } else {
      console.error('invalid input type');
      return undefined;
    }
  } else {
    console.error('value is undefined');
    return undefined;
  }
};

// error message render
export const showErrorMessages = (warnRefObj: IWarnRefObj): void => {
  const keys = Object.keys(warnRefObj);
  const values = Object.values(warnRefObj);
  const filteredErrFields = errorFields.filter((f) => keys.includes(f.key));
  const userDataObjValues:
    | ICreateAccount[]
    | ILogIn[]
    | IRemaindPass[]
    | undefined = userDataObj ? Object.values(userDataObj) : undefined;
  values.forEach((val, i) => {
    if (!userDataObj) {
      val.current.textContent = filteredErrFields[i].message;
    } else {
      if (userDataObjValues) {
        if (!userDataObjValues[i]) {
          val.current.textContent = filteredErrFields[i].message;
        } else {
          val.current.textContent = '';
        }
      }
    }
  });
};
