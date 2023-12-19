import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/api/axios';

interface AuthContextData {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    verifyAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAccessToken = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const { data, status } = await axiosInstance.get('/auth/refresh');
      if (status !== 200) {
        localStorage.setItem('token', data.data);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error verifying access token:', error);
    }

    setLoading(false);
  };

  const value = {
    isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
