import React from 'react'
import LandingImage from '../../../assets/landingimage.jpeg'

const RightSideHero = () => {
  return (
    <div className='hidden lg:block mr-5'>
      <div className='gap-6 flex flex-col items-center'>
        <img src={LandingImage} alt="Landing" className='h-87.5 object-contain rounded-lg'/>
        <h5 className='text-md text-slate-700 dark:text-slate-300'>
          Discover the future of home living with our cutting-edge smart home management
          <br/>system.From seamless automation to intelligent energy solutions, we bring you a
          <br/> smarter, more connected lifestyle.Experience the convenience and efficiency of
          <br/>a truly smart home today.
        </h5>
        <h2 className='text-black dark:text-white font-medium text-5xl leading-17'>
          AI MODERN <span className='text-blue-600'>TECHNOLOGY</span> 
        </h2>
      </div>
    </div>
  )
}

export default RightSideHero