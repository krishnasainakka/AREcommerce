import React from 'react'
import Hero from '../Hero/Hero'
import Category from '../Category/Category'
import Trending from '../Trending/Trending'
import Footer from '../Footer/Footer';
const Home = () => {
  return (
    <div style={{width: '100%', height:'100%'}}>    
        <Hero/>
        <Category/>
        <Trending/>
        <Footer/>
    </div>    
  )
}

export default Home