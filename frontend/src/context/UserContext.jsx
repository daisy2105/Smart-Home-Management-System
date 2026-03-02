import { createContext,  useState } from "react";

export const UserContext = createContext();

  const UserProvider = ({ children }) => {
  const [UserDetail, setUserDetail] = useState(null)
  /*  useEffect(() => {                                 //handle the Re-Login Issue which is faced wheen User Reload the Page 
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUserDetail(response);
      } catch (error) {
        setUserDetail(null);
      }
    };

    fetchUser();
  }, []);     */

  return (
    <UserContext.Provider value={{ UserDetail, setUserDetail}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
