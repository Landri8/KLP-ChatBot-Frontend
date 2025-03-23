import React, { useEffect } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import IntegrationStatsComponent from '../components/IntegrationStatsComponent'
import AchievementsComponent from '../components/AchievementsComponent'
import FAQsComponent from '../components/FAQsComponent'
import FooterComponent from '../components/FooterComponent'
import SolvedProblemsComponents from '../components/SolvedProblemsComponent'
import ProductSolvedComponent from '../components/ProductSolvedComponent'
import ChatBotComponent from '../components/ChatbotComponent'

const SolutionsScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <NavBarComponent />
            <ChatBotComponent />
            <div className='my-32'></div>
            <IntegrationStatsComponent />
            <SolvedProblemsComponents />
            <ProductSolvedComponent />
            <AchievementsComponent />
            <FAQsComponent />
            <FooterComponent />
        </div>
    )
}

export default SolutionsScreen