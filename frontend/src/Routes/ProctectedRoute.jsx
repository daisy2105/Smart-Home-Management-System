import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { UserDetail } = useContext(UserContext);

  // Not logged in
  if (!UserDetail?.UserRole) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (!allowedRoles.includes(UserDetail.UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;