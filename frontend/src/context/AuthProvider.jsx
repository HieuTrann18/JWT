import React, { createContext, useState, useEffect } from "react";
import { signIn, refreshAccessToken } from "../apis/authClient";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  const getPayload = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const startTokenWatcher = () => {
    let interval = setInterval(async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      if (!accessToken || !refreshToken) {
        clearInterval(interval);
        return;
      }

      const payload = getPayload(accessToken);
      if (!payload) {
        logout();
        clearInterval(interval);
        return;
      }

      const now = Date.now() / 1000;
      const remaining = Math.floor(payload.exp - now);
      // console.log("AccessToken còn (giây):", remaining);

      // Refresh nếu sắp hết hạn (<10s)
      if (remaining <= 10) {
        try {
          const res = await refreshAccessToken(refreshToken);
          if (res.data?.accessToken) {
            Cookies.set("accessToken", res.data.accessToken);
            // console.log("AccessToken được refresh:", res.data.accessToken);
          } else {
            logout();
            clearInterval(interval);
          }
        } catch {
          logout();
          clearInterval(interval);
        }
      }

      // Logout nếu đã hết hạn
      if (remaining <= 0) {
        logout();
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    const accessToken = Cookies.get("accessToken");
    if (cookieUser && accessToken) {
      setUser(JSON.parse(cookieUser));
      startTokenWatcher();
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await signIn({ email, password });
    Cookies.set("user", JSON.stringify(res.data.user));
    Cookies.set("accessToken", res.data.accessToken);
    Cookies.set("refreshToken", res.data.refreshToken);
    setUser(res.data.user);
    startTokenWatcher();
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
