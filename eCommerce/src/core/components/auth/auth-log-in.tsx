import { ReactElement } from 'react';

const LogInComponent = (): ReactElement => {
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
              />
            </li>

            <li className="auth-log-in__input-item">
              <input
                className="auth-log-in__input"
                type="password"
                placeholder="Password"
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
          <div className="auth-log-in__btn">
            <h2 className="auth-log-in__btn-title">Create</h2>
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
