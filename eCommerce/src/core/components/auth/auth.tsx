import { /*React, */ ReactElement } from 'react';
/*import CreateUserComponent from './auth-reg';*/
import LogInComponent from './auth-log-in';

const AuthComponent = (): ReactElement => {
  return (
    <div className="auth">
      <LogInComponent />
    </div>
  );
};

export default AuthComponent;
