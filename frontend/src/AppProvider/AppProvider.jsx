import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "../context/ThemeContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppProviders;