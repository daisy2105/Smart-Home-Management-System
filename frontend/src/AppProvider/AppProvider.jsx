import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "../context/ThemeContext";
import UserProvider from "../context/UserContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
};

export default AppProviders;