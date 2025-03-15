import React, { useEffect } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import IntegrationStatsComponent from '../components/IntegrationStatsComponent'
import AchievementsComponent from '../components/AchievementsComponent'
import FAQsComponent from '../components/FAQsComponent'
import FooterComponent from '../components/FooterComponent'
import SolvedProblemsComponents from '../components/SolvedProblemsComponent'
import ProductSolvedComponent from '../components/ProductSolvedComponent'

const SolutionsScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <NavBarComponent />
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