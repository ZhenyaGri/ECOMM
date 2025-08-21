import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (): React.ReactNode => {
  const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
