import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import Loading from "../components/UI/Loading.jsx"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { UserDetail, authLoading } = useContext(UserContext);

  if (authLoading) {                      // When User do refresh page the loading show then show dashboard
    return <Loading loading={true} />
  }

  const Role = UserDetail?.role   // Used Store UserDetail For Checking is User Valid or Invalid based on user Role 
  
  if (!Role) {                           // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(Role)) {     // Role not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;