import React from 'react'
import HeroSection from './HeroSection'
import WhyChooseAyurveda from './WhyChooseAyurveda'
import FeaturedProducts from './FeaturedProducts'
import Products from './Products'

const Home = () => {
  return (
    <div>
        <HeroSection/>
        <FeaturedProducts/>
        {/* <Products/> */}
        <WhyChooseAyurveda/>
    </div>
  )
}

export default Home