import { ReactElement } from 'react';

const PassRecoveryComponent = (): ReactElement => {
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
            />
          </li>
        </ul>

        <div className="auth-reset__actions">
          <div className="auth-reset__btn">
            <h2 className="auth-reset__btn-title">Submit</h2>
          </div>

          <h2 className="auth-reset__cancel-text">Cancel</h2>
        </div>
      </div>
    </>
  );
};

export default PassRecoveryComponent;
