import { ReactElement, useState } from 'react';
import { ILogIn, ICreateAccount, IRemaindPass } from './type/auth-types';
import { inputHandler, getUserDataObj } from './form-handler';

const CreateUserComponent = (): ReactElement => {
  const [, setNewAccount] = useState<ILogIn | ICreateAccount | IRemaindPass>({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });

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
                inputHandler(e, 'firstName', setNewAccount);
              }}
            />
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="last-name"
              type="text"
              placeholder="Last name"
              onInput={(e) => {
                inputHandler(e, 'lastName', setNewAccount);
              }}
            />
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="email"
              type="email"
              placeholder="Email"
              onInput={(e) => {
                inputHandler(e, 'email', setNewAccount);
              }}
            />
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="password"
              type="password"
              placeholder="Password"
              onInput={(e) => {
                inputHandler(e, 'password', setNewAccount);
              }}
            />
          </li>
        </ul>

        <div className="create-account__btn" onClick={getUserDataObj}>
          <h2 className="create-account__btn-title">Create</h2>
        </div>
      </div>
    </>
  );
};

export default CreateUserComponent;