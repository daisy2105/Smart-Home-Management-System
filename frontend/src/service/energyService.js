import AxiosInstance from "../api/axiosInstance";

// Get current power load
export const getCurrentLoad = async () => {
  const response = await AxiosInstance.get("/api/energy/current-load");
  return response.data;
};

// Get hourly energy consumption for a specific date
export const getHourlyConsumption = async (date) => {
  // date should be a string in 'YYYY-MM-DD' format
  const response = await AxiosInstance.get(`/api/energy/hourly/${date}`);
  return response.data;
};

// Get daily energy consumption for a specific month
export const getDailyConsumption = async (year, month) => {
  const response = await AxiosInstance.get(
    `/api/energy/daily/${year}/${month}`,
  );
  return response.data;
};

// Get monthly energy consumption for a specific year
export const getMonthlyConsumption = async (year) => {
  const response = await AxiosInstance.get(`/api/energy/monthly/${year}`);
  return response.data;
};

// Get Single Device EnergyConsumption and Cost
export const getEnergyUsage = async (deviceId, start, end) => {
  const response = await AxiosInstance.get(`/api/devices/${deviceId}/usage`, {
    params: { start, end },
  });

  return response.data;
};
