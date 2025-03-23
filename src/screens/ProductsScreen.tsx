import React, { useEffect } from 'react'
import TopSellingComponent from '../components/TopSellingComponent'
import NavBarComponent from '../components/NavBarComponent'
import LatestProductComponent from '../components/LatestProductComponent'
import FeaturedProductsComponent from '../components/FeaturedProductsComponent'
import KeyFeaturesComponent from '../components/KeyFeaturesComponent'
import FAQsComponent from '../components/FAQsComponent'
import FooterComponent from '../components/FooterComponent'
import ChatBotComponent from '../components/ChatbotComponent'

const ProductsScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <NavBarComponent />
            <ChatBotComponent />
            <div className='my-32'></div>
            <div className='text-center'>
                <h1 className="text-3xl md:text-3xl font-medium mb-8">
                Let’s explore with our new product
                </h1>
            </div>
            <LatestProductComponent />
            <TopSellingComponent />
            <FeaturedProductsComponent />
            <KeyFeaturesComponent />
            <FAQsComponent />
            <FooterComponent />
        </div>
    )
}

export default ProductsScreen