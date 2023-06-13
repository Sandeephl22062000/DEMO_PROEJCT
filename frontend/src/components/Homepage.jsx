import React from 'react'
import Hero from "./Hero/Hero";
import JoinUs from "./JoinUs/JoinUs";
import Features from "./Features/Features";
import Sale from "./Sale/Sale";
import Pricing from "./Pricing/Pricing";
import Gallery from "./Gallery/Gallery";
// import Trainers from "./Trainers/Trainers";
import Summer from "./Summer/Summer";
const Homepage = () => {
  return (
    <div>
      <Hero />
      <JoinUs />
      <Features />
      <Sale />
      {/* <Pricing /> */}
      <Gallery />
      {/* <Trainers /> */}
      <Summer />
    </div>
  )
}

export default Homepage
