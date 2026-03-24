import React, { useState } from "react";
import { createDevice } from "../../../service/deviceService";
import NotificationToaster from "../../../components/UI/NotificationToaster";
import toast from "react-hot-toast";

const deviceTypes = [                               // Device Types
  "AC",
  "LIGHT",
  "FRIDGE",
  "FAN",
  "HEATER",
  "WASHING_MACHINE",
  "SECURITY_CAMERA",
  "SMART_SPEAKER",
];

const DeviceForm = () => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [devicePowerRating, setDevicePowerRating] = useState("");
  const [deviceStatus, setDeviceStatus] = useState("OFF");

  const CreateNewDevice = async (e) => {
    e.preventDefault();

    try {
      const response = await createDevice({                   // Create Device API Calling 
        name: deviceName,                                     // Sending Name, Device Type, PowerRating, Device status (ON/OFF)
        type: deviceType,
        powerRating: devicePowerRating,
        status: deviceStatus,
      });

      setDeviceName("");                                      // clean the inputs
      setDeviceType("");
      setDevicePowerRating("");
      setDeviceStatus("OFF");
      toast.success("Device Added Successfully")
    } catch (error) {
      console.error("Error creating device:", error);
    }
  };

  return (
    <div className="mt-4 mb-4 px-4 md:px-6">
       <NotificationToaster position="top-right" />

      {/* SECTION */}
      <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 md:p-8">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-white">
            Add Devices
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Add your smart home devices
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={CreateNewDevice}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {/* NAME */}
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="Area Name"
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          {/* TYPE */}                                                  
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">Select Device Type</option>
            {deviceTypes.map((type) => (                      // Map All device types 
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* POWER */}
          <input
            type="number"
            value={devicePowerRating}
            onChange={(e) => setDevicePowerRating(e.target.value)}
            placeholder="Power (kWh)"
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          {/* STATUS */}
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <span className="font-medium dark:text-white">Status</span>

            <button
              type="button"
              onClick={() =>
                setDeviceStatus(deviceStatus === "ON" ? "OFF" : "ON")           // Check Toogle Button ON or OFF
              }
              className={`relative w-14 h-7 rounded-full transition-colors
              ${deviceStatus === "ON" ? "bg-blue-600 " : "bg-gray-400"}`}   // If Toggle Button ON 
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform
                ${deviceStatus === "ON" ? "translate-x-7" : "translate-x-0"}`}                    // Toggle Button Animation
              />
            </button>

            <span className="text-sm font-semibold dark:text-white">           {/* Show Status ON/OFF */}
              {deviceStatus}                                            
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-blue-600 dark:bg-gray-200 text-white dark:text-black font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 p-3 w-full sm:w-auto"
          >
            Add Device
          </button>
        </form>
      </section>
    </div>
  );
};

export default DeviceForm;