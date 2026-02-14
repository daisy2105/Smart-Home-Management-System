import React from 'react'
import LeftSideHero from './HeroContent/LeftSideHero'
import RightSideHero from './HeroContent/RightSideHero'
import InfoCardsSection from './HeroDeatils/InfoCardSection'
import HowItWorksSection from './HeroDeatils/HowItsWorkSection'
import CTASection from './HeroDeatils/CTASection'

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-300 scroll-smooth">

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center">
        <div className="max-w-8xl mx-auto px-6 md:px-12 w-full flex flex-col-reverse md:flex-row justify-between items-center md:items-start gap-10">
          
          {/* Hero Left Section */}
          <div className="w-full md:w-1/2">
            <LeftSideHero/>
          </div>

          {/* Hero Right Section */}
          {/* Hidden on small screens */}
          <div className="w-full md:w-1/2 hidden sm:block">
            <RightSideHero/>
          </div>

        </div>
      </section>

      {/* Information Section */}
      <section id='Info' className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <InfoCardsSection/>
        </div>
      </section>

      {/* How it Works Section */}
      <section id='Work' className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <HowItWorksSection/>
        </div>
      </section>

      {/* Final Call Section */}
      <section id='FinalCall'>
        <div>
          <CTASection/>
        </div>
      </section>

    </div>
  )
}

export default HomePage
