import { Main } from '../../pages/page-main/page-main';
import LogInComponent from './auth-log-in';
import CreateUserComponent from './auth-reg';
import PassRecoveryComponent from './auth-reset-pass';
export const mainStateRender = (
  mainState: 'main' | 'login' | 'signUp' | 'recovery',
  toggleView: (view: 'main' | 'login' | 'signUp' | 'recovery') => void
):React.ReactNode => {
  if (mainState === 'main') {
    return <Main />;
  } else if (mainState === 'login') {
    return (
      <LogInComponent
        onSignUp={() => toggleView('signUp')}
        onRecovery={() => toggleView('recovery')}
      />
    );
  } else if (mainState === 'signUp') {
    return <CreateUserComponent onCreateAccount={() => toggleView('main')} />;
  } else if (mainState === 'recovery') {
    return <PassRecoveryComponent onCancel={() => toggleView('main')} />;
  }
  return null;
};
