import React, { createContext, useContext, useEffect, useState } from "react";
import { getDailyConsumption, getMonthlyConsumption } from "../service/energyService";
import { UserContext } from "./UserContext";
import { DeviceContext } from "./DeviceContext";

export const EnergyContext = createContext();

const EnergyProvider = ({ children }) => {
  const { UserDetail } = useContext(UserContext);
  const { devices } = useContext(DeviceContext);

  const [todayEnergy, setTodayEnergy] = useState(0);
  const [monthlyEnergy, setMonthlyEnergy] = useState(0);

  const isLoggedIn = !!UserDetail?.role;

  const calculateTodayEnergy = (dailyData) => {              // Calculate Current Day Energy
    const today = new Date();
    let energy = 0;

    dailyData?.forEach((item) => {                          // Fetch All Devices and Check Current Day 
      if (
        item.year === today.getFullYear() &&
        item.month === today.getMonth() + 1 &&
        item.day === today.getDate()
      ) {
        energy = item.energyConsumption || 0;
      }
    });

    return Number(energy.toFixed(2));                         // Geeting Upto 2 Decimal Number (228.55)
  };

  const calculateMonthlyEnergy = (monthlyData) => {            // Calculate Monthly Energy
    const today = new Date();
    let energy = 0;

    monthlyData?.forEach((item) => {                          // Fetch All Devices and Check Current Month 
      if (
        item.year === today.getFullYear() &&
        item.month === today.getMonth() + 1
      ) {
        energy = item.energyConsumption || 0;
      }
    });

    return Number(energy.toFixed(2));                         // Geeting Upto 2 Decimal Number (228.55)
  };

  useEffect(() => {                                            // Fetch Data
    if (!isLoggedIn) return;

    const fetchEnergy = async () => {
      try {
        const today = new Date();                               // Current Day
        const year = today.getFullYear();                       // Current year
        const month = today.getMonth() + 1;                     // Current Month by (31 or 30 Days)

        const dailyData = await getDailyConsumption(year, month);               // Send Data to Backend
        const monthlyData = await getMonthlyConsumption(year);

        setTodayEnergy(calculateTodayEnergy(dailyData));
        setMonthlyEnergy(calculateMonthlyEnergy(monthlyData));

      } catch (error) {
        console.error("Energy fetch failed:", error);
      }
    };

    fetchEnergy();

    const timer = setInterval(fetchEnergy, 1000);               // Call Every 1sec

    return () => clearInterval(timer);                          // Clear
  }, [isLoggedIn, devices]);

  return (
    <EnergyContext.Provider value={{ todayEnergy, monthlyEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
};

export default EnergyProvider;