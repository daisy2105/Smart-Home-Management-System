import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteDevice } from "../../service/deviceService";

const DeviceDelete = ({ deviceId }) => {                        // Get DeviceId ManageDevice.jsx file 

  const confirmDelete = async () => {
    try {
      const response = await deleteDevice(deviceId);
      toast.success("Device deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* DELETE BUTTON */}
      <button
        onClick={() => confirmDelete()}
        className="p-2 bg-gray-500 text-white rounded disabled:opacity-50 dark:bg-gray-700"
      >
        <Trash2 size={16} />
      </button>
    </>
  );
};

export default DeviceDelete;