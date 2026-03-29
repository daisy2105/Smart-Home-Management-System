import React, { useContext } from "react";
import { EnergyContext } from "../../context/EnergyContext";
import { CreditCard } from "lucide-react";

const EnergyCost = ({ width = "300px", height = "150px" }) => {
  const { monthlyCost } = useContext(EnergyContext);
  const totalCost = monthlyCost ?? 0;

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center justify-center shadow-md"
      style={{ width, height }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <CreditCard
          size={24}
          className="text-blue-600 dark:text-blue-400"
        />
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">
          Monthly Energy Cost
        </h2>
      </div>

      {/* Cost */}
      <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
        ₹ {totalCost.toFixed(2)}
      </p>
    </div>
  );
};

export default EnergyCost;