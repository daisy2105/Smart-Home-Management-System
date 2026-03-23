import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "../context/ThemeContext";
import UserProvider from "../context/UserContext";
import DeviceProvider from "../context/DeviceContext";
import EnergyProvider from "../context/EnergyContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <DeviceProvider>        
          <EnergyProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
          </EnergyProvider>
        </DeviceProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default AppProviders;