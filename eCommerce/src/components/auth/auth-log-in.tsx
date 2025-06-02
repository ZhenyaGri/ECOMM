import './style/auth.scss';
import { ReactElement, useRef, useState } from 'react';
import {
  inputHandler,
  getUserDataObj,
  showErrorMessages,
} from './form-handler';
import type { IWarnRefObj } from './type/auth-types';
import { handleLogin, setToken } from '../../api/authHandlers';

import { parseError } from '../../api/errorHandler';
import { authUserData } from './data-list';
type logInProps = {
  onSignUp: () => void;
  onRecovery: () => void;
  onSuccessLogin: () => void;
};

const LogInComponent = ({
  onSignUp,
  onRecovery,
  onSuccessLogin,
}: logInProps): ReactElement => {
  const [loginError, setLoginError] = useState('');

  const warnRef: IWarnRefObj = {
    email: useRef(null),
    password: useRef(null),
  };

  const onLoginClick = async (): Promise<void> => {
    const userData = getUserDataObj();
    showErrorMessages(warnRef);

    try {
      if (userData && userData.email && 'password' in userData) {
        const authToken = await handleLogin(userData.email, userData.password);
        onSuccessLogin();
        if (authToken) {
          setToken(authToken, 'authToken');
        }
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
                      authUserData.logIn,
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
                      authUserData.logIn,
                      warnRef.password.current
                    );
                  }
                }}
              />
              <h2 ref={warnRef.password} className="input-item-warning"></h2>
            </li>
          </ul>

          <div
            className="auth-log-in__forgot-password-btn"
            onClick={onRecovery}
          >
            <h2 className="auth-log-in__forgot-password">
              Forgot your password ?
            </h2>
          </div>
        </div>

        <div className="auth-log-in__btn-wrapper">
          <div className="auth-log-in__btn" onClick={onLoginClick}>
            <h2 className="auth-log-in__btn-title">LogIn</h2>
          </div>

          <div
            className="auth-log-in__to-create-account-btn"
            onClick={onSignUp}
          >
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
