import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

import { login as authLogin, register as authRegister } from "../services/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const { token: authToken } = await authLogin(email, password);
      setToken(authToken);
      // navigate('/');
      navigate("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const { token: authToken } = await authRegister(
        name,
        email,
        password,
        role
      );
      setToken(authToken);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
