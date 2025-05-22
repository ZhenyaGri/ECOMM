import { errorFields, validationData } from './data-list';
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
  setState: React.Dispatch<
    React.SetStateAction<ICreateAccount | ILogIn | IRemaindPass>
  >,
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
  setState: React.Dispatch<
    React.SetStateAction<ICreateAccount | ILogIn | IRemaindPass>
  >,
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

const getValidInputValue = (
  value: string,
  inputType: string,
  ref: HTMLHeadingElement | null
): string | undefined => {
  if (!value || !ref || value.length === 0) {
    console.error('value is undefined or ref is null');
    return undefined;
  }

  const validationRule = validationData.find(
    (dataObj) => dataObj.type === inputType
  );

  if (!validationRule) {
    console.error(`No validation rule found for type ${inputType}`);
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
  console.log(warnRefObj);
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
      if (val && val.current) {
        val.current.textContent = filteredErrFields[i].message;
      }
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
