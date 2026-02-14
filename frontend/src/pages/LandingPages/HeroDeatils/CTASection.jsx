import React from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";

const CTASection = () => {
  const { darkMode } = useTheme();

  return (
    <section className="py-24 bg-blue-600 dark:bg-blue-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Simplify Your Life with Smart Home Automation
        </h2>
        <p className="text-white text-lg md:text-xl mb-8">
          Say goodbye to manual tasks and inefficiencies. Join us today and experience
          a smarter, easier, and more connected home.
        </p>
        <a
          href="/signup"
          className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default CTASection;
