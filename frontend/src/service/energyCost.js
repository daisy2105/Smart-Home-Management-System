import AxiosInstance from "../api/axiosInstance";

// used for past day Cost (year + month)
export const getCostByDay = async (year, month) => {
  const response = await AxiosInstance.get(`/api/cost/daily/${year}/${month}`);
  return response.data;
};

// Used for perivous Monthly Cost (year) 
export const getCostByMonthly = async (year) => {
  const response = await AxiosInstance.get(`/api/cost/monthly/${year}`);
  return response.data;
};

// Today Cost 
export const getTodayCost = async () => {
  const response = await AxiosInstance.get(`/api/cost/today`);
  return response.data;
};

// Current Month Cost 
export const getCurrentMonthCost = async () => {
  const response = await AxiosInstance.get(`/api/cost/this-month`);
  return response.data;
};