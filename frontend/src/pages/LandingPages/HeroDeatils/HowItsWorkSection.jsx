import React from "react";
import Lottie from "lottie-react";
import { Zap, Home, BarChart, Shield } from "lucide-react";
import HomeAnimation from "../../../assets/animation/smart home wifi connect.json";

const HowItWorksSection = () => {

  const steps = [
    {
      title: "Connect Devices",
      description:
        "Easily connect all your smart home devices to our platform in a few simple steps.",
      icon: <Home size={32} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Automate & Control",
      description:
        "Control lights, appliances, and energy usage from a single, intuitive dashboard.",
      icon: <Zap size={32} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Monitor & Optimize",
      description:
        "Track energy consumption and get AI-powered suggestions to save energy.",
      icon: <BarChart size={32} className="text-blue-600 dark:text-blue-400" />,
    },
    {
      title: "Secure Your Home",
      description:
        "Receive real-time alerts and keep your home safe with smart security features.",
      icon: <Shield size={32} className="text-blue-600 dark:text-blue-400" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
          Follow these simple steps to set up and enjoy your smart home system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-30">
          {/* Steps List */}
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Lottie Animation */}
          <div className="hidden md:flex items-center justify-center">
            <div className="bg-blue-100 dark:bg-blue-900 w-full h-80 rounded-2xl flex items-center justify-center">
              <div className="text-blue-600 dark:text-blue-400 text-lg font-semibold">
                <Lottie
                  animationData={HomeAnimation}
                  loop={true}
                  style={{ width: 500, height: 500 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
