import React, { useContext } from "react";
import { DeviceContext } from "../../../context/DeviceContext";
import DeviceToggleButton from "../../../components/Button/DeviceToggleButton";
import DeviceDeleteButton from "../../../components/Button/DeleteDeviceButton";

const MyDevices = () => {
 const { devices } = useContext(DeviceContext)

  return (
    <div className="mt-4 mb-4 px-4 md:px-8">

      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-white">
          My Devices
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
          View all connected smart devices
        </p>
      </div>

      {/* GRID SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {devices?.map((device) => (
          <div
            key={device.id}
            className="bg-white/80 dark:bg-gray-900 rounded-2xl shadow-md p-6 flex flex-col justify-between border border-transparent cursor-pointer"
          >
            {/* Device Info */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
               <h3 className="text-lg font-bold truncate mb-1 text-gray-900 dark:text-white">{device.name}</h3>

               {/* Status */}
              <span className={`px-2 py-1 rounded text-sm
                  ${device.status === "ON"
                      ? "bg-green-500 text-white dark:bg-green-600"
                      : "bg-red-500 text-white dark:bg-red-600"
                  }`}
              >
                {device.status}
              </span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-sm">Type: {device.type}</p>
              <p className="text-gray-700 dark:text-gray-400 text-sm">Power Rating: {device.powerRating} kWh</p>
            </div>
            <div className="flex justify-end gap-2">
              <DeviceToggleButton device={device}/>
              <DeviceDeleteButton deviceId={device.id}/>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MyDevices;