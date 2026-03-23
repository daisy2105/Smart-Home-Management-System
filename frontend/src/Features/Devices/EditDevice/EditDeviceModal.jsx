import React, { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Cpu, Zap } from "lucide-react";
import { updateDeviceName } from "../../../service/deviceService";

const EditDeviceModal = ({ device, onCancel }) => {
  const [name, setName] = useState(device.name);
  const [type] = useState(device.type);
  const [power] = useState(device.powerRating);

  const changes = async () => {
    try {
      await updateDeviceName(device.id, name);

      toast.success("Device updated successfully");
      onCancel();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-[5px]"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-96 p-6 rounded-2xl bg-white dark:bg-gray-800 dark:text-white shadow-md z-10 animate-in fade-in zoom-in-95">

        <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
          <Pencil size={20} className="text-blue-500" />
          Edit Device
        </h3>

        {/* Name */}
        <div className="relative mb-4">
          <Pencil
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Type */}
        <div className="relative mb-4">
          <Cpu
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={type}
            readOnly
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Power */}
        <div className="relative mb-5">
          <Zap
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500"
          />
          <input
            type="number"
            value={power}
            readOnly
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            Cancel
          </button>

          <button
            onClick={changes}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDeviceModal;