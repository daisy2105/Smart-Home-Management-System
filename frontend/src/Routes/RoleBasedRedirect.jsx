import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const { UserDetail } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(UserDetail?.UserRole)

  useEffect(() => {
    if (UserDetail?.UserRole === "admin") {
      navigate("/admin/dashboard");
    } else if (UserDetail?.UserRole === "homeowner") {
      navigate("/homeowner/dashboard");
    } else if (UserDetail?.UserRole === "technician") {
      navigate("/technician/dashboard");
    }
  }, [UserDetail, navigate]);

  return null;
};

export default RoleBasedRedirect;