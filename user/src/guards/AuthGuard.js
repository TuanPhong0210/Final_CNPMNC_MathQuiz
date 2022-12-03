import { node } from 'prop-types';
import { Navigate } from 'react-router-dom';

// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_AUTHENTICATION } from '../routes/path';

const propTypes = {
  children: node,
};

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={PATH_AUTHENTICATION.login} />;
  }
  return children;
};

AuthGuard.propTypes = propTypes;

export default AuthGuard;
