import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { refreshToken as apiRefreshToken } from "../apis/authClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const savedUserData = userData ? JSON.parse(userData) : null;
  const savedAccessToken = localStorage.getItem("accessToken");
  const savedRefreshToken = localStorage.getItem("refreshToken");

  const [user, setUser] = useState(savedUserData);
  const [accessToken, setAccessToken] = useState(savedAccessToken);
  const [refreshToken, setRefreshToken] = useState(savedRefreshToken);

  useEffect(() => {
    if (!accessToken || !user) return;
    const checkToken = async () => {
      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const timeleft = payload.exp * 1000 - Date.now();

        if (timeleft < 5000) {
          if (!refreshToken) return logout();
          try {
            const res = await apiRefreshToken(refreshToken);
            const token = res.newAccessToken.accessToken;
            setAccessToken(token);
            localStorage.setItem("accessToken", token);
          } catch (err) {
            logout();
          }
        } else {
          const timer = setTimeout(async () => {
            if (!refreshToken) return logout();
            try {
              const res = await apiRefreshToken(refreshToken);
              const token = res.newAccessToken.accessToken;
              setAccessToken(token);
              localStorage.setItem("accessToken", token);
            } catch (err) {
              logout();
            }
          }, timeleft - 5000);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        logout();
      }
    };
    checkToken();
  }, [accessToken, refreshToken, user]);

  const login = (newAccessToken, newRefreshToken, newUser) => {
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    localStorage.setItem("user", JSON.stringify(newUser));

    setUser(newUser);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
