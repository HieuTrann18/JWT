import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../apis/authClient";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const login = async (email, password) => {
    const res = await signIn({ email, password });

    Cookies.set("user", JSON.stringify(res.data.user));
    Cookies.set("accessToken", res.data.accessToken);
    Cookies.set("refreshToken", res.data.refreshToken);  
    
  };
  return <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
