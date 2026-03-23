import AxiosInstance from "../api/axiosInstance";

// GET all devices
export const getDevices = async () => {
  const response = await AxiosInstance.get("/api/devices");
  return response.data;
};

// CREATE device
export const createDevice = async (data) => {
  const response = await AxiosInstance.post("/api/devices", data);
  return response.data;
};

// Get SINGLE device
export const singleDevice = async () => {
  const response = await AxiosInstance.get("/api/devices");
  return response.data;
};

// DELETE device
export const deleteDevice = async (id) => {
  await AxiosInstance.delete(`/api/devices/${id}`);
};

// UPDATE STATUS
export const updateDeviceStatus = async (id, status) => {
  const response = await AxiosInstance.put(`/api/devices/${id}/status`, { status });
  return response.data;
};

// UPDATE NAME
export const updateDeviceName = async (id, name) => {
  const response = await AxiosInstance.put(`/api/devices/${id}/name`, { name });
  return response.data;
};
