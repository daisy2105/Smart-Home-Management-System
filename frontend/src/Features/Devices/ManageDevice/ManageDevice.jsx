import React, { useContext, useState } from "react";
import { DeviceContext } from "../../../context/DeviceContext";
import DeviceToggleButton from "../../../components/Button/DeviceToggleButton";
import DeleteDeviceButton from "../../../components/Button/DeleteDeviceButton";
import NotificationToaster from "../../../components/UI/NotificationToaster";
import EditDeviceButton from "../../../components/Button/EditDeviceButton";
import EditDeviceModal from "../EditDevice/EditDeviceModal";

const ManageDevice = () => {
  const { devices } = useContext(DeviceContext);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleEdit = (device) => {                  // Open edit modal and set selected device         
    setSelectedDevice(device);
  };

  const handleClose = () => {                        // Close edit modal
    setSelectedDevice(null);
  };

  return (
    <div className="mt-4 mb-4 px-4 md:px-8">
      <NotificationToaster position="top-right" />

      <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-white">
            Manage Devices
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            View and manage all connected smart devices
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
          <table className="w-full table-fixed text-[11px] sm:text-sm md:text-base">

            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-2 px-2 sm:px-4 text-left font-semibold w-1/5">Name</th>
                <th className="py-2 px-2 sm:px-4 text-left font-semibold w-1/5">Type</th>
                <th className="py-2 px-2 sm:px-4 text-left font-semibold w-1/5">Power</th>
                <th className="py-2 px-2 sm:px-4 text-left font-semibold w-1/5">Status</th>
                <th className="py-2 px-2 sm:px-4 text-center font-semibold w-1/5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {devices?.map((device) => (
                <tr
                  key={device.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-2 px-2 sm:px-4 truncate">{device.name}</td>
                  <td className="py-2 px-2 sm:px-4 truncate">{device.type}</td>
                  <td className="py-2 px-2 sm:px-4 truncate">
                    {device.powerRating} kWh
                  </td>

                  {/* STATUS */}
                  <td className="py-2 px-2 sm:px-4">
                    <span
                      className={`px-2 py-[2px] rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap
                      ${
                        device.status === "ON"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                      }`}
                    >
                      {device.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="py-2 px-2 sm:px-4">
                    <div className="flex justify-center gap-1 sm:gap-2 flex-wrap">
                      <DeviceToggleButton device={device} />

                      {/* edit button */}
                      <EditDeviceButton
                        device={device}
                        onEdit={handleEdit}
                      />

                      <DeleteDeviceButton deviceId={device.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Edit Device MODAL */}
      {selectedDevice && (
        <EditDeviceModal
          device={selectedDevice}
          onCancel={handleClose}
        />
      )}
    </div>
  );
};

export default ManageDevice;