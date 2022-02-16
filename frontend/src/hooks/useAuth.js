import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const useAuth = () => {
  const isAuthenticatedCached =
    localStorage.getItem('isAuthenticated') === 'true';
  const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedCached);

  return {
    isAuthenticated,
    login: () =>
      new Promise(res => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', true);
        res();
      }),
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const AuthConsumer = () => useContext(AuthContext);

export default AuthConsumer;
