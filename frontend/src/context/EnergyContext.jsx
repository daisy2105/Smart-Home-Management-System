import React, { createContext, useContext, useEffect, useState } from "react";

import { getTodayEnergyConsumption, getCurrentMonthEnergyConsumption } from "../service/energyService";
import { UserContext } from "./UserContext";

export const EnergyContext = createContext();

const EnergyProvider = ({ children }) => {
  const { UserDetail } = useContext(UserContext);

  //  user login check
  const isLoggedIn = !!UserDetail?.role;

  const [todayEnergy, setTodayEnergy] = useState(0);
  const [monthlyEnergy, setMonthlyEnergy] = useState(0);
  const [loading, setLoading] = useState(false);

  /* FETCH ENERGY DATA */
  const fetchEnergyUsage = async () => {
    try {
      setLoading(true);

      // ENERGY
      const todayEnergyRes = await getTodayEnergyConsumption();
      const monthEnergyRes = await getCurrentMonthEnergyConsumption();

      setTodayEnergy(Number(todayEnergyRes.toFixed(2)));             // only 2 decimal after point
      setMonthlyEnergy(Number(monthEnergyRes.toFixed(2)));

    } catch (error) {
      console.error("Energy Context Error:", error);
    } finally {
      setLoading(false);
    }
  };

    /* LOAD WHEN USER LOGS IN */
    useEffect(() => {
      if (!isLoggedIn) return;

      fetchEnergyUsage();
    }, [isLoggedIn]);

  return (
    <EnergyContext.Provider value={{ todayEnergy, monthlyEnergy, loading }}>
      {children}
    </EnergyContext.Provider>
  );
};

export default EnergyProvider;
