import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { UserDetail, authLoading, SignUpUser } = useContext(UserContext);    //In SignUpUser store user detail which store in create Account page

  if (authLoading) {                      // When User do refresh page the loading show then show dashboard
    return (
      <div className="h-screen flex bg-white justify-center items-center">
        <h1 className="text-black">Loading...</h1>
      </div>
    );
  }

  const Role = UserDetail?.role || SignUpUser?.role   // Used Store UserDetail For Checking is User Valid or Invalid based on user Role 
  
  if (!Role) {                           // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(Role)) {     // Role not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;