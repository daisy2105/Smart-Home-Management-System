import React from "react";
import { Cpu, Home, Zap } from "lucide-react";

const AboutUsPage = () => {
  const aboutPoints = [
    {
      icon: <Home size={36} className="text-blue-600 dark:text-blue-400" />,
      title: "Smart Home Control",
      description:
        "Easily control lights, appliances, and other devices from a single, intuitive dashboard.",
    },
    {
      icon: <Zap size={36} className="text-blue-600 dark:text-blue-400" />,
      title: "Automation & Scheduling",
      description:
        "Automate daily tasks and create schedules to make your home more efficient and convenient.",
    },
    {
      icon: <Cpu size={36} className="text-blue-600 dark:text-blue-400" />,
      title: "Energy Monitoring",
      description:
        "Monitor energy usage in real-time and get suggestions to save power and reduce bills.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          About Our System
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12">
          Our Smart Home Management System provides seamless control, automation, and monitoring of your home devices to make everyday life smarter, safer, and more convenient.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {aboutPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {point.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
