import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost/api";

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      setUser(response.data.user.username);
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      localStorage.setItem("token", JSON.stringify(response.data.token)); 
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  const register = async (userData:any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };

  const logout = async() => {

   const token =  localStorage.getItem("token"); 
    try {
      const response = await axios.post(`${API_BASE_URL}/logout`, {
        token
      });
      console.log(response);
      navigate("/");
    } catch (err) {
      setError("Log out failed.");
      console.error(err);
    }
    setUser(null);

    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
