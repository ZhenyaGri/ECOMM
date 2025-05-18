import { ReactElement, useRef, useState } from 'react';
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

const CreateUserComponent = (): ReactElement => {
  const [, setNewAccount] = useState<ILogIn | ICreateAccount | IRemaindPass>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });
  const warnRef: IWarnRefObj = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
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

        <div
          className="create-account__btn"
          onClick={() => {
            getUserDataObj();
            showErrorMessages(warnRef);
          }}
        >
          <h2 className="create-account__btn-title">Create</h2>
        </div>
      </div>
    </>
  );
};

export default CreateUserComponent;
