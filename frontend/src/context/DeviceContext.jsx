import React, { createContext, useContext, useEffect, useState } from "react";
import { getDevices } from "../service/deviceService";
import { UserContext } from "./UserContext";

export const DeviceContext = createContext();

const DeviceProvider = ({ children }) => {
  const { UserDetail } = useContext(UserContext);
  const [devices, setDevices] = useState([]);

  const isLoggedIn = !!UserDetail?.role;             // Check if user login then fetch all devices

  useEffect(() => {
    if (!isLoggedIn) return;                        // If User isn't login then return 

    const fetchDevices = async () => {
      try {
        const data = await getDevices();               // Get all devices from backend
        setDevices(data);                              // Store in context
      } catch (error) {
        console.log(error)
      }
    };

    fetchDevices();                                     // Fetch immediately
    const timer = setInterval(fetchDevices, 1000);    // Fetch every 1 seconds

    return () => clearInterval(timer);                // Cleanup interval on unmount
  }, [isLoggedIn]);

  return (
    <DeviceContext.Provider value={{ devices, setDevices}}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;