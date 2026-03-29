import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { getHourlyEnergyConsumption } from "../../service/energyService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const EnergyLineChart = () => {
  const [selectedDay, setSelectedDay] = useState("today");
  const [chartData, setChartData] = useState(new Array(24).fill(0));

  /* ---------- FORMAT DATE ---------- */
  const formatDate = (date) => date.toISOString().split("T")[0];

  /* ---------- GET DATE BASED ON SELECTION ---------- */
  const getSelectedDate = () => {
    const date = new Date();

    if (selectedDay === "yesterday") {
      date.setDate(date.getDate() - 1);
    }

    return formatDate(date);
  };

  /* ---------- LOAD DATA ---------- */
  const loadEnergyData = async () => {
    try {
      const date = getSelectedDate();

      const response = await getHourlyEnergyConsumption(date);

      const hourlyData = new Array(24).fill(0);

      response?.forEach((item) => {
        hourlyData[item.hour] = item.energy;
      });

      setChartData(hourlyData);
    } catch (err) {
      console.error("Energy load error:", err);
    }
  };

  useEffect(() => {
    loadEnergyData();
  }, [selectedDay]);

  /* ---------- LABELS ---------- */
  const labels = Array.from({ length: 24 }, (_, i) =>
      `${i.toString().padStart(2, "0")}:00`
  );

  const data = {
    labels,
    datasets: [
      {
        label:
            selectedDay === "today"
                ? "Today's Energy Usage"
                : "Yesterday's Energy Usage",
        data: chartData,
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
      <div style={{ width: "95%", padding: "20px" }}>
        <div className="bg-gray-200 p-10 rounded-lg">
          <h3>24 Hour Energy Usage</h3>

          {/* SELECT OPTION */}
          <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              style={{ marginBottom: "20px", padding: "6px" }}
          >
            <option value="today">Today Usage</option>
            <option value="yesterday">Yesterday Usage</option>
          </select>

          <div style={{ height: "500px" }}>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
  );
};

export default EnergyLineChart;