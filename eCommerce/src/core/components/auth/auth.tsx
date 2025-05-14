import { /*React, */ ReactElement } from 'react';
import CreateUserComponent from './auth-reg';
import LogInComponent from './auth-log-in';
import PassRecoveryComponent from './auth-reset-ass';
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
