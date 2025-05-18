import {
  ICreateAccount,
  IErrorField,
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
  e: React.FormEvent<HTMLInputElement>,
  type: string,
  setState: React.Dispatch<React.SetStateAction<ILogIn | IRemaindPass>>,
  ref: HTMLHeadingElement | null
): void => {
  const element = e.target;
  if (element instanceof HTMLInputElement) {
    const value = element.value;
    updateFormState(value, type, setState, ref);
  }
};

//formHandler main func to get whole data obj
const updateFormState = (
  value: string ,
  inputType: string,
  setState: React.Dispatch<React.SetStateAction<ILogIn | IRemaindPass>>,
  ref: HTMLHeadingElement | null
): void => {
    const inputVal = getValidInputValue(value, inputType, ref);
    setState((prev) => {
      const stateObj = { ...prev, [inputType]: inputVal };
      userDataObj = { ...stateObj };
      console.log(userDataObj);
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
    if (inputType === 'firstName' || inputType === 'lastName') {
      if (value.length > 0) {
        ref.textContent = '';
        return value;
      } else {
        if (inputType === 'firstName') {
          ref.textContent = 'Please enter your first name';
        }
        if (inputType === 'lastName') {
          ref.textContent = 'Please enter your last name';
        }
        return undefined;
      }
    } else if (inputType === 'email') {
      const isValid: boolean = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/.test(value);
      if (isValid) {
        ref.textContent = '';
        return value;
      } else {
        return undefined;
      }
    } else if (inputType === 'password') {
      const isPassValid: boolean = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(
        value
      );
      if (isPassValid) {
        if (ref) {
          ref.textContent = '';
        }
        return value;
      } else {
        ref.textContent =
          'Invalid password: min 8 chars, include uppercase and number.';
        return undefined;
      }
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
  const errorFields: IErrorField[] = [
    { key: 'firstName', message: 'Please enter your first name' },
    { key: 'lastName', message: 'Please enter your last name' },
    { key: 'email', message: 'Please enter your email' },
    { key: 'password', message: 'Please enter your password' },
  ];

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
