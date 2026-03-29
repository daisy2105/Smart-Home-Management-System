import React, { useContext, useEffect, useState } from "react";
import { Plug, Zap, Calendar, Layers } from "lucide-react";
import { DeviceContext } from "../../../../context/DeviceContext";
import { EnergyContext } from "../../../../context/EnergyContext";

const DeviceCard = () => {
  const { devices = [] } = useContext(DeviceContext);
  const { todayEnergy, monthlyEnergy } = useContext(EnergyContext);

  const [status, setStatus] = useState(0);

  useEffect(() => {                                  // count active devices
    let count = 0;

    devices.forEach((device) => {
      if (device.status === "ON") {
        count += 1;
      }
    });

    setStatus(count);
  }, [devices]);

  const cardData = [                                
    {
      title: "Total Devices",                         // Total registered devices
      value: devices.length,
      unit: "device",
      color: "from-blue-500 to-blue-600",
      icon: <Plug size={24} className="mr-2" />,
    },
    {
      title: "Active Devices",                        // Devices currently ON
      value: status,
      unit: "device",
      color: "from-green-500 to-green-600",
      icon: <Zap size={24} className="mr-2" />,
    },
    {
      title: "Today's Usage",                         // Today's energy consumption (from context)
      value: todayEnergy, 
      unit: "kW",
      color: "from-purple-500 to-purple-600",
      icon: <Calendar size={24} className="mr-2" />,
    },
    {
      title: "Monthly Usage",                          // Current month energy consumption
      value: monthlyEnergy, 
      unit: "kW",
      color: "from-yellow-400 to-yellow-500",
      icon: <Layers size={24} className="mr-2" />,
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cardData.map((card) => (
        <div
          key={card.title}
          className={`p-4 sm:p-6 rounded-2xl shadow-lg bg-gradient-to-r ${card.color} text-white flex flex-col justify-between`}
        >
          <div className="flex items-center">
            {card.icon}
            <h3 className="text-xs sm:text-sm md:text-base font-semibold">
              {card.title}
            </h3>
          </div>

          <p className="text-sm sm:text-lg md:text-2xl font-bold mt-2">
            {card.value} {card.unit}
          </p>
        </div>
      ))}
    </section>
  );
};

export default DeviceCard;