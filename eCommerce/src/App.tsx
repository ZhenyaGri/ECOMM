import { ReactElement /* useState */ } from 'react';
import AuthComponent from './core/components/auth/auth';
import './App.scss';

function App(): ReactElement<Element> {
  return (
    <>
      <div className="authoriztion">
        <AuthComponent />
      </div>
    </>
  );
}

export default App;
