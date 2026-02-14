import React from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import {
  Wifi,
  Thermometer,
  Clock,
  ShieldCheck,
  Lightbulb,
  Power,
  Smartphone,
  Bell,
} from "lucide-react";

const FeaturePage = () => {
  const { darkMode } = useTheme();

  const features = [
    {
      title: "Smart Connectivity",
      description: "Connect all your devices seamlessly over Wi-Fi or Zigbee for smooth control.",
      icon: <Wifi size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Energy Efficiency",
      description: "Monitor and reduce energy usage intelligently with automated suggestions.",
      icon: <Thermometer size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Real-time Monitoring",
      description: "Track your home environment anytime, anywhere from the dashboard.",
      icon: <Clock size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Secure & Protected",
      description: "Keep your home safe with smart security systems and alerts.",
      icon: <ShieldCheck size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Smart Lighting",
      description: "Control lights individually or in groups, set moods, and save energy.",
      icon: <Lightbulb size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Power Management",
      description: "Manage appliances and optimize power consumption to reduce bills.",
      icon: <Power size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Remote Access",
      description: "Control and monitor your smart home from anywhere using your phone.",
      icon: <Smartphone size={36} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Instant Notifications",
      description: "Get alerts for unusual activity, device errors, or scheduled tasks.",
      icon: <Bell size={36} className="text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-12">
          Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturePage;
