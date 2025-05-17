import { ReactElement, useState } from 'react';
import { inputHandler, getUserDataObj } from './form-handler';
import type { ILogIn, IRemaindPass } from './type/auth-types';

const LogInComponent = (): ReactElement => {
  const [, setLogInData] = useState<ILogIn | IRemaindPass>({
    email: undefined,
    password: undefined,
  });

  return (
    <>
      <div className="auth-log-in">
        <h2 className="auth-log-in__title">Login</h2>

        <div className="auth-log-in__list-wrapper">
          <ul className="auth-log-in__input-list">
            <li className="auth-log-in__input-item">
              <input
                className="auth-log-in__input"
                type="email"
                placeholder="Email"
                onInput={(e) => {
                  inputHandler(e, 'email', setLogInData);
                }}
              />
            </li>

            <li className="auth-log-in__input-item">
              <input
                className="auth-log-in__input"
                type="password"
                placeholder="Password"
                minLength={8}
                onInput={(e) => {
                  inputHandler(e, 'password', setLogInData);
                }}
              />
            </li>
          </ul>

          <div className="auth-log-in__forgot-password-btn">
            <h2 className="auth-log-in__forgot-password">
              Forgot your password ?
            </h2>
          </div>
        </div>

        <div className="auth-log-in__btn-wrapper">
          <div className="auth-log-in__btn" onClick={getUserDataObj}>
            <h2 className="auth-log-in__btn-title">LogIn</h2>
          </div>

          <div className="auth-log-in__to-create-account-btn">
            <h2 className="auth-log-in__to-create-account"> Create account</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogInComponent;
