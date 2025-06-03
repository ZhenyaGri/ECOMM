import './index.scss';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Wrapper } from './components/wrapper/wrapper';
import { Header } from './components/header/header';
import { Text } from './components/text/text';
import { Footer } from './components/footer/footer';
import { Main } from './pages/page-main/page-main';
import LogInComponent from './components/auth/auth-log-in';
import CreateUserComponent from './components/auth/auth-reg';
import PassRecoveryComponent from './components/auth/auth-reset-pass';
import { Page404 } from './pages/page-404/page-404';

import { getToken, removeToken } from './api/authHandlers';
import { Catalog } from './pages/catalog/catalog';
import { ProtectedRoute } from './utils/protected-route';
import { TestPage } from './pages/test-page';
import { dataReset } from './components/auth/form-handler';
import { ProfileComponent } from './components/profile/profile';

function App(): React.ReactNode {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('loggedIn') === 'true';
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const authToken = await getToken('authToken');
      if (authToken) {
        setIsLoggedIn(true);
      }
    };

    checkAuth();
  }, []);

  useEffect((): (() => void) | void => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <>
      <Wrapper className="wrapper-shipping">
        <Text content="Free shipping above €150" />
      </Wrapper>
      <Header
        isLoggedIn={isLoggedIn}
        onLogIn={() => navigate('/login')}
        onSignUp={() => navigate('/registration')}
        onLogOut={() => {
          setIsLoggedIn(false);
          removeToken();
          sessionStorage.setItem('loggedIn', 'false');
          sessionStorage.clear();
          navigate('/');
          dataReset();
        }}
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/catalog" element={<Catalog />} />
        {!isLoggedIn ? (
          <>
            <Route
              path="/login"
              element={
                <LogInComponent
                  onSignUp={() => navigate('/registration')}
                  onRecovery={() => navigate('/recovery')}
                  onSuccessLogin={() => {
                    setIsLoggedIn(true);
                    sessionStorage.setItem('loggedIn', 'true');
                    navigate('/');
                    setSuccessMessage('Logged in successfully!');
                  }}
                />
              }
            />
            <Route
              path="/registration"
              element={
                <CreateUserComponent
                  onCreateAccount={() => navigate('/')}
                  onSuccessSignUp={() => {
                    setIsLoggedIn(true);
                    sessionStorage.setItem('loggedIn', 'true');
                    navigate('/');
                    setSuccessMessage('Account created successfully!');
                  }}
                  onLogIn={() => navigate('/login')}
                />
              }
            />
          </>
        ) : (
          <>
            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route
                path="/registration"
                element={<Navigate to="/" replace />}
              />
              <Route path="/test" element={<TestPage />} />
            </Route>
          </>
        )}
        <Route
          path="/recovery"
          element={<PassRecoveryComponent onCancel={() => navigate('/')} />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </>
  );
}

export default App;
