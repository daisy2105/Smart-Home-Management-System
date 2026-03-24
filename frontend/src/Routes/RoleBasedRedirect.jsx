import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const RoleBasedRedirect = () => {
  const { UserDetail } = useContext(UserContext);     //In SignUpUser store user detail which store in create Account page
  const navigate = useNavigate();

  const role = UserDetail?.role         // Getting Role from context for checking user role

  useEffect(() => {                    // Role Based Redirect User
    switch (role) {
      case "ADMIN":
        navigate("/admin/dashboard", { replace: true });
        break;

      case "HOMEOWNER":
        navigate("/homeowner/dashboard", { replace: true });
        break;

      case "TECHNICIAN":
        navigate("/technician/dashboard", { replace: true });
        break;

      default:
        navigate("/unauthorized");
    }
  }, [role, navigate]);

  return null;
};

export default RoleBasedRedirect;