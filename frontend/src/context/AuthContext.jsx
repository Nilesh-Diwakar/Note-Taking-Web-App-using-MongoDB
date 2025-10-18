
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is logged in by fetching user profile from backend
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/me"); // new endpoint to get logged-in user
        if (res.data.success) {
          setUser(res.data.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); // new logout endpoint to clear cookie
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

