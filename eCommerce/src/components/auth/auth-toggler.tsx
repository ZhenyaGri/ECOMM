import { Main } from '../../pages/page-main/page-main';
import LogInComponent from './auth-log-in';
import CreateUserComponent from './auth-reg';
import PassRecoveryComponent from './auth-reset-pass';
export const mainStateRender = (
  mainState: 'main' | 'login' | 'signUp' | 'recovery',
  toggleView: (view: 'main' | 'login' | 'signUp' | 'recovery') => void,
  setIsLoggedIn: (status: boolean) => void,
  setSuccessMessage: (msg: string) => void
): React.ReactNode => {
  if (mainState === 'main') {
    return <Main />;
  } else if (mainState === 'login') {
    return (
      <LogInComponent
        onSignUp={() => toggleView('signUp')}
        onRecovery={() => toggleView('recovery')}
        onSuccessLogin={() => {
          setIsLoggedIn(true);
          toggleView('main');
          setSuccessMessage('Logged in successfully!');
        }}
      />
    );
  } else if (mainState === 'signUp') {
    return (
      <CreateUserComponent
        onCreateAccount={() => toggleView('main')}
        onSuccessSignUp={() => {
          setIsLoggedIn(true);
          toggleView('main');
          setSuccessMessage('Account created successfully!');
        }}
        onLogIn={() => toggleView('login')}
      />
    );
  } else if (mainState === 'recovery') {
    return <PassRecoveryComponent onCancel={() => toggleView('main')} />;
  }
  return null;
};
