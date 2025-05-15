import { Wrapper } from './components/wrapper/wrapper';
import { Header } from './components/header/header';
import { Text } from './components/text/text';
import { Main } from './pages/page-main/page-main';
import { Footer } from './components/footer/footer';

function App(): React.ReactNode {
  return (
    <>
      <Wrapper className="wrapper-shipping">
        <Text content="Free shipping above €150" />
      </Wrapper>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
