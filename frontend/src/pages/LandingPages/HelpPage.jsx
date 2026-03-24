import React from "react";
import { HelpCircle, Key, Cpu, BarChart } from "lucide-react";

const HelpPage = () => {

  const faqs = [
    {
      icon: <Key size={32} className="text-blue-600 dark:text-blue-400" />,
      question: "How to register and login?",
      answer:
        "Use the signup page to register as Homeowner, Admin, or Technician. Then login using your credentials.",
    },
    {
      icon: <Cpu size={32} className="text-blue-600 dark:text-blue-400" />,
      question: "How to add devices?",
      answer:
        "Navigate to the dashboard and click 'Add Device' to register your smart appliances and sensors.",
    },
    {
      icon: <BarChart size={32} className="text-blue-600 dark:text-blue-400" />,
      question: "How to monitor energy usage?",
      answer:
        "The dashboard displays real-time energy usage for all connected devices. Use insights to save energy.",
    },
    {
      icon: <HelpCircle size={32} className="text-blue-600 dark:text-blue-400" />,
      question: "How to automate tasks?",
      answer:
        "Use the Automation section to schedule tasks like turning on lights, controlling appliances, or notifications.",
    },
    {
      icon: <HelpCircle size={32} className="text-blue-600 dark:text-blue-400" />,
      question: "How to enable dark mode?",
      answer:
        "Use the toggle button in the hero section to switch between light and dark modes.",
    },
  ];

  return (
    <section className="min-h-screen py-24 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 text-center">
          Help Center
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 text-center">
          Here are some common questions and guidance to help you navigate the Smart Home Management System.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex gap-4 items-start"
            >
              <div>{faq.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
