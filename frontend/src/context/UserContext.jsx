import { createContext,  useState, useEffect } from "react";
import { getUserDetail } from "../service/authService";

export const UserContext = createContext();

  const UserProvider = ({ children }) => {
  const [UserDetail, setUserDetail] = useState(null);
  const [SignUpUser, setSignUpUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {       //Re-login User when page referesh
      try {
        const User = await getUserDetail(); // uses for getting user data from db through the backend for re-login
        setUserDetail(User);              // add response in setUserDetail 
      } catch (error) {
        if (error.response?.status === 401 ||
          error.response?.status === 403) {
          setUserDetail(null);
        }
      } finally {
        setAuthLoading(false);
    }
    };
      fetchUser();                  // Function call --> Used for re-login user by getting data from backend  
  }, []);

  return (
    <UserContext.Provider value={{ UserDetail, setUserDetail, SignUpUser, setSignUpUser, authLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
