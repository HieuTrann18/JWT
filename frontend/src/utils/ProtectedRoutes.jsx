import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
const ProtectedRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/error" replace />;
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
