import React, { useEffect, useState } from 'react';
import NavBarComponent from '../components/NavBarComponent';
import HeroComponent from '../components/HeroComponent';
import FeaturedProductsComponent from '../components/FeaturedProductsComponent';
import KeyFeaturesComponent from '../components/KeyFeaturesComponent';
import AchievementsComponent from '../components/AchievementsComponent';
import SponsorShipComponent from '../components/SponsorShipComponent';
import CoreValuesComponent from '../components/CoreValuesComponent';
import FAQsComponent from '../components/FAQsComponent';
import FooterComponent from '../components/FooterComponent';
import LatestProductComponent from '../components/LatestProductComponent';

function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <NavBarComponent />
      <div className='my-32'></div>
      <HeroComponent />
      <LatestProductComponent />
      <FeaturedProductsComponent />
      <KeyFeaturesComponent />
      <AchievementsComponent />
      <SponsorShipComponent />
      <CoreValuesComponent />
      <FAQsComponent />
      <FooterComponent />
    </div>
  );
}

export default App;