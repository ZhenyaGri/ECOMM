import { ILogIn, IRemaindPass } from './type/auth-types';

let obj: ILogIn | IRemaindPass | undefined = undefined;

//function to get object with data after validation
export const getUserDataObj = (): ILogIn | IRemaindPass | undefined => {
  if (obj) {
    const objValues = Object.values(obj);
    const isObjValues = objValues.every((val) => val !== undefined);
    if (isObjValues) {
      console.log(obj);
      return obj;
    } else {
      console.log(obj);
      console.error('obj is undefined or somting went wrong');
    }
  }
};

export const inputHandler = (
  e: React.FormEvent<HTMLInputElement>,
  type: string,
  setState: React.Dispatch<React.SetStateAction<ILogIn | IRemaindPass>>
): void => {
  const element = e.target;
  if (element instanceof HTMLInputElement) {
    const value = element.value;
    updateFormState(value, type, setState);
  }
};

//formHandler main func to get whole data obj
const updateFormState = (
  value: string | undefined,
  inputType: string,
  setState: React.Dispatch<React.SetStateAction<ILogIn | IRemaindPass>>
): void => {
  if (value) {
    const inputVal = getValidInputValue(value, inputType);
    setState((prev) => {
      const next = { ...prev, [inputType]: inputVal };
      obj = { ...next };
      console.log(obj);
      return next;
    });
  } else {
    console.error('value is undefind');
  }
};

//function to get valid value from inpue
const getValidInputValue = (
  value: string,
  inputType: string
): string | undefined => {
  if (value) {
    if (inputType === 'firstName' || inputType === 'lastName') {
      console.log(value);
      return value;
    } else if (inputType === 'email') {
      const isValid: boolean = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/.test(value);
      if (isValid) {
        return value;
      } else {
        console.error(
          'Invalid password: min 8 chars, include uppercase and number.'
        );
        return undefined;
      }
    } else if (inputType === 'password') {
      const isPassValid: boolean = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(
        value
      );
      if (isPassValid) {
        return value;
      } else {
        console.error(
          'Invalid password: min 8 chars, include uppercase and number.'
        );
        return undefined;
      }
    } else {
      console.error('invalid input type');
      return undefined;
    }
  } else {
    console.error('value is undefined');
  }
};
