import React from "react";
import { Edit2 } from "lucide-react";

const EditDeviceButton = ({ device, onEdit }) => {          // Get Devices and onEdit from ManageDevice.jsx file  
  return (
    <button                                                 // Edit Device Button
      onClick={() => onEdit(device)}
      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
    >
      <Edit2 size={16} />
    </button>
  );
};

export default EditDeviceButton;