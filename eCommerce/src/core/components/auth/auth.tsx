import './style/auth.scss';
import { /*React, */ ReactElement } from 'react';
//components
import CreateUserComponent from './auth-reg';
import LogInComponent from './auth-log-in';
import PassRecoveryComponent from './auth-reset-pass';

const AuthComponent = (): ReactElement => {
  return (
    <div className="auth">
      <CreateUserComponent />
      <LogInComponent />
      <PassRecoveryComponent />
    </div>
  );
};

export default AuthComponent;
