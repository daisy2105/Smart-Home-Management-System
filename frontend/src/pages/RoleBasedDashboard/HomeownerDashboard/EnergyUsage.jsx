import React from 'react';
import MonthlyEnergyChart from '../../../Features/Energy/MonthlyEnergyChart';
import MonthlyEnergyCost from '../../../Features/EnergyCost/MonthlyEnergyCost';
import TodayEnergyCost from '../../../Features/EnergyCost/TodayEnergyCost';

const EnergyUsage = () => {
  return (
    <div className="px-4 md:px-8 space-y-8">
      <div className='mb-5'>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex flex-col mb-2">
          Energy Usage
        </h1>
        <p className='text-sm text-gray-500'>Check Your Energy Usage By Daily and monthly</p>
      </div>

      <div className='flex justify-center items-center bg-gray-200 dark:bg-gray-900 p-6 rounded-xl'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>Monthly Usage</h1>
      </div>

      <div className='flex justify-around shadow-md p-4 rounded-xl'>
        <div className='flex flex-col gap-5 mt-12'>
          <MonthlyEnergyCost/>
          <TodayEnergyCost/>
        </div>
        <MonthlyEnergyChart />
      </div>
      <div className='flex justify-center items-center bg-gray-200 dark:bg-gray-900 p-6 rounded-xl mt-20'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>Daily Usage</h1>
      </div>
      <div className="w-full mx-auto shadow-md p-4 rounded-xl flex justify-center items-center">
      </div>
    </div>
  );
};

export default EnergyUsage;