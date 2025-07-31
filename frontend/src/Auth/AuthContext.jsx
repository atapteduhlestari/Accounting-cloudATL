// src/Auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoading: true,
    isLoggedIn: false,
    user: null,
  });

  // Fungsi untuk cek siapa yang login
  const refreshAuth = () => {
    axios
      .get('http://192.168.1.29:8000/api/user', {
        withCredentials: true,
      })
      .then((res) => {
        setAuth({
          isLoading: false,
          isLoggedIn: true,
          user: res.data,
          role: res.data.role,
        });
        localStorage.setItem('isLoggedIn', 'true');
      })
      .catch(() => {
        setAuth({
            isLoading: false,
            isLoggedIn: false,
            user: null,
          });
          localStorage.setItem('isLoggedIn', 'false');
        });
  };

  // Jalankan saat pertama kali App dibuka
  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
