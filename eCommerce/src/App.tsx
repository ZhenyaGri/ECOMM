import { ReactElement, useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { handleLogin } from './api/authHandlers';
import { parseError } from './api/ErrorHandler';

function App(): ReactElement<Element> {
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const login = async (): Promise<void> => {
      try {
        await handleLogin();
      } catch (err) {
        const msg = parseError(err);
        setErrorMessage(msg);
      }
    };

    login();
  }, []);

  return (
    <>
      <div>
        <h2>
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        </h2>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count: number): number => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
