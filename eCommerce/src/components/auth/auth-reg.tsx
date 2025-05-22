import './style/auth.scss';
import { ReactElement, useRef, useState } from 'react';
import { accountFields, addressFields, countries } from './data-list';

import type {
  ILogIn,
  ICreateAccount,
  IRemaindPass,
  IWarnRefObj,
} from './type/auth-types';
import {
  inputHandler,
  getUserDataObj,
  showErrorMessages,
} from './form-handler';
import { handleSignup, mapToCustomerDraft } from '../../api/authHandlers';
import { parseError } from '../../api/errorHandler';
import ShippingAddressComponent from './auth-reg-shipping-addres';
import defaultNewUserObj from './get-defoult-new-uuser-obj';

type CreateAccountProps = {
  onCreateAccount: () => void;
  onSuccessSignUp: () => void;
};

const CreateUserComponent = ({
  onCreateAccount,
  onSuccessSignUp,
}: CreateAccountProps): ReactElement => {
  const [isShippingAddressVisible, setIsShippingAddressVisible] =
    useState(true);
  const creacteAccountDataObj: ICreateAccount = defaultNewUserObj(
    isShippingAddressVisible
  );
  const [, setNewAccount] = useState<ILogIn | ICreateAccount | IRemaindPass>(
    creacteAccountDataObj
  );

  const [signupError, setSignupError] = useState('');

  const onSigInClick = async (): Promise<void> => {
    const formData = getUserDataObj();
    showErrorMessages({
      ...warnRefAccount,
      ...warnRefAddress,
      ...warnRefShiping,
    });
    console.log(creacteAccountDataObj);
    try {
      const customerDraft = mapToCustomerDraft(formData);
      await handleSignup(customerDraft);
      onSuccessSignUp();
      setSignupError('');
    } catch (error) {
      const errorMsg = parseError(error);
      setSignupError(errorMsg);
    }
  };

  const warnRefAccount: IWarnRefObj = {
    firstName: useRef(null),
    lastName: useRef(null),
    birthDate: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  const warnRefAddress: IWarnRefObj = {
    street: useRef(null),
    city: useRef(null),
    postCode: useRef(null),
    country: useRef(null),
  };

  const warnRefShiping: IWarnRefObj = {
    shippingStreet: useRef(null),
    shippingCity: useRef(null),
    shippingPostCode: useRef(null),
    shippingCountry: useRef(null),
  };

  return (
    <>
      <div className="create-account">
        <h2 className="create-account__title">Create account</h2>
        {/*person details input list*/}
        <ul className="create-account__input-list">
          {accountFields.map((fieldObj) => (
            <li className={fieldObj.classNameItem}>
              {fieldObj.inputType === 'date' ? (
                <input
                  className={fieldObj.classNameInput}
                  id={fieldObj.inputId}
                  type={fieldObj.inputType}
                  defaultValue="2000-01-01"
                  placeholder={fieldObj.placeholder}
                  onInput={(e) => {
                    const ref = warnRefAccount[fieldObj.type];
                    if (ref) {
                      inputHandler(
                        e,
                        fieldObj.type,
                        setNewAccount,
                        ref.current
                      );
                    }
                  }}
                />
              ) : (
                <input
                  className={fieldObj.classNameInput}
                  id={fieldObj.inputId}
                  type={fieldObj.inputType}
                  placeholder={fieldObj.placeholder}
                  onInput={(e) => {
                    const ref = warnRefAccount[fieldObj.type];
                    if (ref) {
                      inputHandler(
                        e,
                        fieldObj.type,
                        setNewAccount,
                        ref.current
                      );
                    }
                  }}
                />
              )}

              <h2
                className={fieldObj.classNameWarning}
                ref={warnRefAccount[fieldObj.type]}
              ></h2>
            </li>
          ))}
        </ul>

        <h2 className="create-account__title address-title">Billing Address</h2>

        {/*address details input list*/}
        <ul className="create-account__input-list">
          {addressFields.map((fieldObj) => (
            <li className={fieldObj.classNameItem} key={fieldObj.inputId}>
              {fieldObj.inputType === 'select' ? (
                <>
                  <select
                    className={fieldObj.classNameInput}
                    id={fieldObj.inputId}
                    name={fieldObj.type}
                    onChange={(e) => {
                      const ref = warnRefAddress[fieldObj.type];
                      if (ref) {
                        inputHandler(
                          e,
                          fieldObj.type,
                          setNewAccount,
                          ref.current
                        );
                      }
                    }}
                  >
                    <option className="create-account-option-title" value="">
                      Choose your country
                    </option>
                    {countries.map((country) => (
                      <option
                        className="create-account-option"
                        key={country.code}
                        value={country.code}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <input
                    className={fieldObj.classNameInput}
                    id={fieldObj.inputId}
                    type={fieldObj.inputType}
                    placeholder={fieldObj.placeholder}
                    onInput={(e) => {
                      const ref = warnRefAddress[fieldObj.type];
                      if (ref) {
                        inputHandler(
                          e,
                          fieldObj.type,
                          setNewAccount,
                          ref.current
                        );
                      }
                    }}
                  />
                </>
              )}

              <h2
                className={fieldObj.classNameWarning}
                ref={warnRefAddress[fieldObj.type]}
              ></h2>
            </li>
          ))}

          <li className="create-account__input-item-checkbox">
            <input
              className="checkbox"
              id="checkbox"
              type="checkbox"
              checked={!isShippingAddressVisible}
              onChange={(e) => setIsShippingAddressVisible(!e.target.checked)}
            />

            <span className="checkmark"></span>
            <label htmlFor="checkbox-label">
              Set billing addres as defoult value
            </label>
          </li>
        </ul>

        {isShippingAddressVisible && (
          <ShippingAddressComponent
            setNewAccount={setNewAccount}
            warnRefShiping={warnRefShiping}
          />
        )}

        <div className="create-account__btn-wrapper">
          <div className="create-account__btn" onClick={onSigInClick}>
            <h2 className="create-account__btn-title">Create</h2>
          </div>

          <h2 className="create-account__cancel-text" onClick={onCreateAccount}>
            Cancel
          </h2>
        </div>

        {signupError && (
          <h3 className="create-account__error-message">{signupError}</h3>
        )}
      </div>
    </>
  );
};

export default CreateUserComponent;
