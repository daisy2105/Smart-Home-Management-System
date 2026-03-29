import AxiosInstance from "../api/axiosInstance";

// Today Energy Consumption
export const getTodayEnergyConsumption = async () => {
  const response = await AxiosInstance.get("/api/energy/today");
  return response.data;
};

// Current Month Energy Consumption 
export const getCurrentMonthEnergyConsumption = async () => {
  const response = await AxiosInstance.get("/api/energy/this-month");
  return response.data;
};

// Get Single Device EnergyConsumption and Cost
export const getEnergyUsage = async (deviceId, start, end) => {
  const response = await AxiosInstance.get(`/api/devices/${deviceId}/usage`, {
    params: { start, end },
  });

  return response.data;
};
