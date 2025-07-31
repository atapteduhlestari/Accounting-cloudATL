import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }) {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
