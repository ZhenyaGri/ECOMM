import './index.scss';
import { useState } from 'react';
import { Wrapper } from './components/wrapper/wrapper';
import { Header } from './components/header/header';
import { Text } from './components/text/text';
import { Footer } from './components/footer/footer';
import { mainStateRender } from './components/auth/auth-toggler';

function App(): React.ReactNode {
  const [mainState, setMainState] = useState<
    'main' | 'login' | 'signUp' | 'recovery'
  >('main');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleView = (view: 'main' | 'login' | 'signUp' | 'recovery'): void =>
    setMainState(view);
  return (
    <>
      <Wrapper className="wrapper-shipping">
        <Text content="Free shipping above €150" />
      </Wrapper>

      <Header
        isLoggedIn={isLoggedIn}
        onLogIn={() => toggleView('login')}
        onSignUp={() => toggleView('signUp')}
        onLogOut={() => {
          setIsLoggedIn(false);
          toggleView('main');
        }}
      />
      {mainStateRender(mainState, toggleView, setIsLoggedIn)}
      <Footer />
    </>
  );
}

export default App;
