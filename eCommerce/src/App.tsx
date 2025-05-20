import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Wrapper } from './components/wrapper/wrapper';
import { Header } from './components/header/header';
import { Text } from './components/text/text';
import { Main } from './pages/page-main/page-main';
import { Footer } from './components/footer/footer';
import LogInComponent from './components/auth/auth-log-in';
import CreateUserComponent from './components/auth/auth-reg';
import { Page404 } from './pages/page-404/page-404';

function App(): React.ReactNode {
  return (
    <>
      <Wrapper className="wrapper-shipping">
        <Text content="Free shipping above €150" />
      </Wrapper>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogInComponent />} />
          <Route path="/registration" element={<CreateUserComponent />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
