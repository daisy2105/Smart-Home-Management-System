import React, { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { DeviceContext } from "../../context/DeviceContext";
import { getEnergyUsage } from "../../service/energyService";

ChartJS.register( CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyEnergyBarChart = () => {
  const { devices } = useContext(DeviceContext);

  const [selectedMonth, setSelectedMonth] = useState("current");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [chartData, setChartData] = useState([0, 0, 0, 0]);

  /* FORMAT DATE */
  const formatLocalDateTime = (date) => {
    const pad = (n) => n.toString().padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`;
  };

  /* GET MONTH WEEKS */
  const getMonthWeeks = (isPrevious = false) => {
    const today = new Date();

    const year = today.getFullYear();
    const month = isPrevious
      ? today.getMonth() - 1
      : today.getMonth();

    const endOfMonth = new Date(year, month + 1, 0);

    const ranges = [
      [1, 7],
      [8, 14],
      [15, 21],
      [22, endOfMonth.getDate()],
    ];

    return ranges.map(([startDay, endDay]) => {
      const start = new Date(year, month, startDay, 0, 0, 0);
      const end = new Date(year, month, endDay, 23, 59, 59);

      return {
        start: formatLocalDateTime(start),
        end: formatLocalDateTime(end),
      };
    });
  };

  /* LOAD DATA */
  const loadMonthlyData = async () => {
    try {
      const weeks = getMonthWeeks(selectedMonth === "previous");

      const weeklyEnergy = [];

      for (const week of weeks) {
        const responses = await Promise.all(
          (devices || []).map((device) =>
            getEnergyUsage(device.id, week.start, week.end)
          )
        );

        const total = responses.reduce(
          (sum, res) => sum + (res?.totalEnergy || 0),
          0
        );

        weeklyEnergy.push(total);
      }

      setChartData(weeklyEnergy);
    } catch (err) {
      console.error("Monthly energy error:", err);
    }
  };

  useEffect(() => {
    if (devices?.length) {
      loadMonthlyData();
    }
  }, [selectedMonth, devices]);

  /* ===============================
     CHART DATA
  =============================== */
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label:
          selectedMonth === "current"
            ? "This Month Usage"
            : "Past Month Usage",
        data: chartData,
        backgroundColor: "rgba(16,185,129,0.85)",
        borderRadius: 8,
        barThickness: 50,
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

  /* ===============================
     UI
  =============================== */
  return (
    <div className="p-5 flex justify-center">
      {/* h-120 w-180 */}
      <div className="bg-gray-200 p-10 rounded-lg h-[30rem] w-[45rem]">

        {/* HEADER */}
        <div className="flex justify-between mb-5 relative">
          <h3 className="text-lg font-semibold">
            Monthly Energy Usage
          </h3>

          {/* DROPDOWN */}
          <div>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="border px-3 py-1 bg-white cursor-pointer"
            >
              {selectedMonth === "current"
                ? "This Month"
                : "Past Month"}{" "}
              {openDropdown ? "▲" : "▼"}
            </button>

            {openDropdown && (
              <div className="absolute right-0 top-10 bg-white border p-3 shadow">
                <label className="block">
                  <input
                    type="radio"
                    value="current"
                    checked={selectedMonth === "current"}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      setOpenDropdown(false);
                    }}
                  />
                  <span className="ml-2">This Month</span>
                </label>

                <label className="block mt-2">
                  <input
                    type="radio"
                    value="previous"
                    checked={selectedMonth === "previous"}
                    onChange={(e) => {
                      setSelectedMonth(e.target.value);
                      setOpenDropdown(false);
                    }}
                  />
                  <span className="ml-2">Past Month</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* GRAPH AREA */}
        <div className="h-[24rem] w-full">
          <Bar data={data} options={options} />
        </div>

      </div>
    </div>
  );
};

export default MonthlyEnergyBarChart;