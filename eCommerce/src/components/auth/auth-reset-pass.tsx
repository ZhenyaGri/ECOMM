import './style/auth.scss';
import { ReactElement } from 'react';
import {
  inputHandler,
  getUserDataObj,
  showErrorMessages,
} from './form-handler';
import { authUserData } from './data-list';
import { useRefs } from './refs';
type RecoveryPassProps = {
  onCancel: () => void;
};

const PassRecoveryComponent = ({
  onCancel,
}: RecoveryPassProps): ReactElement => {
  const { warnRefRestoreUser } = useRefs();

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
                if (warnRefRestoreUser.email) {
                  inputHandler(
                    e,
                    'email',
                    authUserData.restorUser,
                    warnRefRestoreUser.email.current
                  );
                }
              }}
            />
            <h2
              ref={warnRefRestoreUser.email}
              className="input-item-warning"
            ></h2>
          </li>
        </ul>

        <div className="auth-reset__actions">
          <div
            className="auth-reset__btn"
            onClick={() => {
              getUserDataObj();
              showErrorMessages(warnRefRestoreUser);
            }}
          >
            <h2 className="auth-reset__btn-title">Submit</h2>
          </div>

          <h2 className="auth-reset__cancel-text" onClick={onCancel}>
            Cancel
          </h2>
        </div>
      </div>
    </>
  );
};

export default PassRecoveryComponent;
