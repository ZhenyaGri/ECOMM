import './style/auth.scss';
import { ReactElement, useRef, useState } from 'react';
import { countries } from './data-list';

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

type CreateAccountProps = {
  onCreateAccount: () => void;
};

const CreateUserComponent = ({
  onCreateAccount,
}: CreateAccountProps): ReactElement => {
  const [, setNewAccount] = useState<ILogIn | ICreateAccount | IRemaindPass>({
    firstName: undefined,
    lastName: undefined,
    birthDate: undefined,
    email: undefined,
    password: undefined,
    street: undefined,
    city: undefined,
    postCode: undefined,
    country: undefined,
  });

  const warnRef: IWarnRefObj = {
    firstName: useRef(null),
    lastName: useRef(null),
    birthDate: useRef(null),
    email: useRef(null),
    password: useRef(null),
    street: useRef(null),
    city: useRef(null),
    postCode: useRef(null),
    country: useRef(null),
  };

  return (
    <>
      <div className="create-account">
        <h2 className="create-account__title">Create account</h2>
        <ul className="create-account__input-list">
          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="first-name"
              type="text"
              placeholder="First name"
              onInput={(e) => {
                if (warnRef.firstName) {
                  inputHandler(
                    e,
                    'firstName',
                    setNewAccount,
                    warnRef.firstName.current
                  );
                }
              }}
            />
            <h2
              ref={warnRef.firstName}
              id="first-name"
              className="input-item-warning"
            ></h2>
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="last-name"
              type="text"
              placeholder="Last name"
              onInput={(e) => {
                if (warnRef.lastName) {
                  inputHandler(
                    e,
                    'lastName',
                    setNewAccount,
                    warnRef.lastName.current
                  );
                }
              }}
            />
            <h2 ref={warnRef.lastName} className="input-item-warning"></h2>
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="birthDate"
              type="text"
              placeholder="Select your date birth"
              onFocus={(e) => {
                e.target.type = 'date';
                e.target.value = '';
              }}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              onInput={(e) => {
                if (warnRef.birthDate) {
                  inputHandler(
                    e,
                    'birthDate',
                    setNewAccount,
                    warnRef.birthDate.current
                  );
                }
              }}
            />
            <h2 ref={warnRef.birthDate} className="input-item-warning"></h2>
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="email"
              type="email"
              placeholder="Email"
              onInput={(e) => {
                if (warnRef.email) {
                  inputHandler(
                    e,
                    'email',
                    setNewAccount,
                    warnRef.email.current
                  );
                }
              }}
            />
            <h2 ref={warnRef.email} className="input-item-warning"></h2>
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="password"
              type="password"
              placeholder="Password"
              minLength={8}
              onInput={(e) => {
                if (warnRef.password) {
                  inputHandler(
                    e,
                    'password',
                    setNewAccount,
                    warnRef.password.current
                  );
                }
              }}
            />
            <h2 ref={warnRef.password} className="input-item-warning"></h2>
          </li>
        </ul>

        <h2 className="create-account__title address-title">Address</h2>

        <ul className="create-account__input-list">
          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="street"
              type="Text"
              placeholder="Street"
              onInput={(e) => {
                if (warnRef.street) {
                  inputHandler(
                    e,
                    'street',
                    setNewAccount,
                    warnRef.street.current
                  );
                }
              }}
            />
            <h2 ref={warnRef.street} className="input-item-warning"></h2>
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="city"
              type="text"
              placeholder="City"
              onInput={(e) => {
                if (warnRef.city) {
                  inputHandler(e, 'city', setNewAccount, warnRef.city.current);
                }
              }}
            />
            <h2 ref={warnRef.city} className="input-item-warning"></h2>
          </li>
          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="postcode"
              type="text"
              placeholder="Postal code"
              onInput={(e) => {
                if (warnRef.postCode) {
                  inputHandler(
                    e,
                    'postCode',
                    setNewAccount,
                    warnRef.postCode.current
                  );
                }
              }}
            />
            <h2 ref={warnRef.postCode} className="input-item-warning"></h2>
          </li>

          <li className="create-account__input-item">
            <select
              className="create-account__input"
              name="country"
              onChange={(e) => {
                if (warnRef.country) {
                  inputHandler(
                    e,
                    'country',
                    setNewAccount,
                    warnRef.country.current
                  );
                }
              }}
            >
              <option className="create-account-option-title" value="">
                Chose your country
              </option>
              {countries.map((country) => (
                <option
                  className="create-account-option"
                  key={country}
                  value={country}
                >
                  {country}
                </option>
              ))}
            </select>
            <h2 ref={warnRef.country} className="input-item-warning"></h2>
          </li>
        </ul>

        <div className="create-account__btn-wrapper">
          <div
            className="create-account__btn"
            onClick={() => {
              getUserDataObj();
              showErrorMessages(warnRef);
            }}
          >
            <h2 className="create-account__btn-title">Create</h2>
          </div>

          <h2 className="create-account__cancel-text" onClick={onCreateAccount}>
            Cancel
          </h2>
        </div>
      </div>
    </>
  );
};

export default CreateUserComponent;
