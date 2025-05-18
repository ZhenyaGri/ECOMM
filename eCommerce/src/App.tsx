import './App.scss';
import { ReactElement /* useState */ } from 'react';

import CreateUserComponent from './core/components/auth/auth-reg';
import LogInComponent from './core/components/auth/auth-log-in';
import PassRecoveryComponent from './core/components/auth/auth-reset-pass';



function App(): ReactElement<Element> {
  return (
    <>
      <div className="authoriztion">
      <CreateUserComponent />
      <LogInComponent />
      <PassRecoveryComponent />
      </div>
    </>
  );
}

export default App;
