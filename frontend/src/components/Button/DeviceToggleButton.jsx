import React from "react";
import { Power } from "lucide-react";
import toast from "react-hot-toast";
import { updateDeviceStatus } from "../../service/deviceService";

const DeviceToggleButton = ({ device }) => {                  // Get Devices ManageDevice.jsx file 

  const handleToggle = async () => {
    try {
      const Status = device.status === "ON" ? "OFF" : "ON";
      const response = await updateDeviceStatus(device.id, Status);
      toast.success("Device Status Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button                                   // Device ON/OFF Button
      onClick={handleToggle}
      className={`p-2 rounded text-white transition duration-200 
        ${device.status === "ON"
          ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          : "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
      }`}
    >
      <Power size={16} />
    </button>
  );
};

export default DeviceToggleButton;