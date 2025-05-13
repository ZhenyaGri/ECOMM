import { ReactElement } from 'react';
import './style/auth.scss';

const CreateUserComponent = (): ReactElement => {
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
            />
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="last-name"
              type="text"
              placeholder="Last name"
            />
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="email"
              type="text"
              placeholder="Email"
            />
          </li>

          <li className="create-account__input-item">
            <input
              className="create-account__input"
              id="password"
              type="password"
              placeholder="Password"
            />
          </li>
        </ul>

        <div className="create-account__btn">
          <h2 className="create-account__btn-title">Create</h2>
        </div>
      </div>
    </>
  );
};

export default CreateUserComponent;
