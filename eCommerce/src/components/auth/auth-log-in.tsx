import './style/auth.scss';
import { ReactElement, useRef, useState } from 'react';
import {
  inputHandler,
  getUserDataObj,
  showErrorMessages,
} from './form-handler';
import type { ILogIn, IRemaindPass, IWarnRefObj } from './type/auth-types';
import { handleLogin } from '../../api/authHandlers';
import { parseError } from '../../api/errorHandler';

const LogInComponent = (): ReactElement => {
  const [, setLogInData] = useState<ILogIn | IRemaindPass>({
    email: undefined,
    password: undefined,
  });

  const warnRef: IWarnRefObj = {
    email: useRef(null),
    password: useRef(null),
  };

  const [loginError, setLoginError] = useState('');

  const onLoginClick = async (): Promise<void> => {
    const userData = getUserDataObj();
    showErrorMessages(warnRef);

    try {
      if (userData && userData.email && 'password' in userData) {
        await handleLogin(userData.email, userData.password);
      }
      setLoginError('');
    } catch (error) {
      const errorMessage = parseError(error);
      setLoginError(errorMessage);
    }
  };

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
                  if (warnRef.email) {
                    inputHandler(
                      e,
                      'email',
                      setLogInData,
                      warnRef.email.current
                    );
                  }
                }}
              />
              <h2 ref={warnRef.email} className="input-item-warning"></h2>
            </li>

            <li className="auth-log-in__input-item">
              <input
                className="auth-log-in__input"
                type="password"
                placeholder="Password"
                minLength={8}
                onInput={(e) => {
                  if (warnRef.password) {
                    inputHandler(
                      e,
                      'password',
                      setLogInData,
                      warnRef.password.current
                    );
                  }
                }}
              />
              <h2 ref={warnRef.password} className="input-item-warning"></h2>
            </li>
          </ul>

          <div className="auth-log-in__forgot-password-btn">
            <h2 className="auth-log-in__forgot-password">
              Forgot your password ?
            </h2>
          </div>
        </div>

        <div className="auth-log-in__btn-wrapper">
          <div className="auth-log-in__btn" onClick={onLoginClick}>
            <h2 className="auth-log-in__btn-title">LogIn</h2>
          </div>

          <div className="auth-log-in__to-create-account-btn">
            <h2 className="auth-log-in__to-create-account"> Create account</h2>
          </div>
        </div>
        {loginError && (
          <h3 className="auth-log-in__error-message">{loginError}</h3>
        )}
      </div>
    </>
  );
};

export default LogInComponent;
