import React from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { Zap, Home, Shield } from "lucide-react"; // Lucide icons

const InfoCardsSection = () => {
  const { darkMode } = useTheme();

  const cards = [
    {
      title: "Smart Energy Management",
      description:
        "Monitor and optimize your home’s energy usage with AI-powered insights.",
      icon: <Zap size={40} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Home Automation",
      description:
        "Control lights, appliances, and devices seamlessly from one dashboard.",
      icon: <Home size={40} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Security & Surveillance",
      description:
        "Keep your home safe with smart security systems and alerts in real-time.",
      icon: <Shield size={40} className="text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-12">
          Why Choose Our Smart Home System
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCardsSection;
