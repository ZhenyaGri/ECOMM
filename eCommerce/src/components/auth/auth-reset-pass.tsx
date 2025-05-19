import './style/auth.scss';
import { ReactElement, useRef, useState } from 'react';
import { IRemaindPass, IWarnRefObj } from './type/auth-types';
import {
  inputHandler,
  getUserDataObj,
  showErrorMessages,
} from './form-handler';
const PassRecoveryComponent = (): ReactElement => {
  const [, setEmail] = useState<IRemaindPass>({
    email: undefined,
  });

  const warnRef: IWarnRefObj = {
    email: useRef(null),
  };
  return (
    <>
      <div className="auth-reset">
        <div className="auth-reset__title-wrapper">
          <h2 className="auth-reset__title">
            Reset your <br />
            password
          </h2>
          <h2 className="auth-reset__subtitle">
            We will send you an email to reset your password
          </h2>
        </div>

        <ul className="auth-reset__input-list">
          <li className="auth-reset__item">
            <input
              className="auth-reset__input"
              type="email"
              placeholder="Email"
              onInput={(e) => {
                if (warnRef.email) {
                  inputHandler(e, 'email', setEmail, warnRef.email.current);
                }
              }}
            />
            <h2 ref={warnRef.email} className="input-item-warning"></h2>
          </li>
        </ul>

        <div className="auth-reset__actions">
          <div
            className="auth-reset__btn"
            onClick={() => {
              getUserDataObj();
              showErrorMessages(warnRef);
            }}
          >
            <h2 className="auth-reset__btn-title">Submit</h2>
          </div>

          <h2 className="auth-reset__cancel-text">Cancel</h2>
        </div>
      </div>
    </>
  );
};

export default PassRecoveryComponent;
