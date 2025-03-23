import React, { useEffect } from 'react'
import AchievementsComponent from '../components/AchievementsComponent';
import CompanyAboutComponent from '../components/CompanyAboutComponent';
import GrowthComponent from '../components/GrowthComponent';
import CoreValuesComponent from '../components/CoreValuesComponent';
import FooterComponent from '../components/FooterComponent';
import FAQsComponent from '../components/FAQsComponent';
import NavBarComponent from '../components/NavBarComponent';
import ChatBotComponent from '../components/ChatbotComponent';

const AboutScreen = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <NavBarComponent />
      <ChatBotComponent />
      <div className='my-24'></div>
      <CompanyAboutComponent />
      <GrowthComponent />
      <AchievementsComponent />
      <CoreValuesComponent />
      <FAQsComponent />
      <FooterComponent />
    </div>
  )
}

export default AboutScreen