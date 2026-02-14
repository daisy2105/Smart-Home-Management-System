import React from 'react'
import { useTheme } from '../../../context/ThemeContext.jsx'
import Temperature from '../../../assets/temperature.jpeg'
import smartappliances from '../../../assets/smartappliances.jpeg'

const LeftSideHero = () => {

  {/* dark mode state from context*/}
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className='max-w-2xl w-full mb-16 lg:mb-0 ml-0 md:ml-5 px-4 md:px-0'>

      {/* Hero Welcome Text and button */}
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 dark:text-white leading-10 sm:leading-12 md:leading-14 lg:leading-17'>
        Welcome to a <span className='text-blue-600'>Smarter</span><br />
        Home Experience
      </h1>

      <p className='mt-2 text-base sm:text-lg md:text-lg text-slate-600 dark:text-slate-300'>
        Your one-stop solution for smart home automation and intelligent energy management.
      </p>

      <div className='mt-4 flex flex-col sm:flex-row gap-4'>
        <a href='/signup' className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center'>
          Get Started
        </a>
        <a href='/aboutus' className='px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition text-center'>
          Learn More
        </a>
      </div>

      {/* Hero Elements and Dark Mode button */}
      <div className='mt-10 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-3 items-center md:items-start'>

        <div className='flex md:flex flex-col gap-3 md:gap-2 w-full md:w-auto items-center'>
          {/* Temperature Image */}
          <img src={Temperature} alt="Temperature" className='w-full sm:w-64 md:w-52 lg:w-64 h-auto object-contain rounded-lg'/>

          {/* Dark Mode Toggle */}
          <div className='flex flex-col items-center bg-black dark:bg-white rounded-lg px-23 py-10 mt-2 md:mt-0'>
            <p className='text-sm font-medium text-white dark:text-black mb-2'>Dark Mode</p>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-14 h-7 rounded-full transition ${darkMode ? "bg-green-500" : "bg-gray-400"}`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition ${darkMode ? "translate-x-7" : ""}`}
              ></span>
            </button>
          </div>
        </div>

        {/* Smart Appliances Image */}
        <img
          src={smartappliances}
          alt="Smart Appliances"
          className='h-65 object-contain rounded-lg hidden sm:block'
        />

      </div>
    </div>
  )
}

export default LeftSideHero
