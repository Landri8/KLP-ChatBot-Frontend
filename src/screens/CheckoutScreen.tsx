import React, { useEffect } from 'react'
import NavBarComponent from '../components/NavBarComponent'
import CheckoutFormComponent from '../components/CheckoutFormComponent'
import FooterComponent from '../components/FooterComponent'
import ChatBotComponent from '../components/ChatbotComponent'

const CheckoutScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <NavBarComponent />
            <ChatBotComponent />
            <CheckoutFormComponent />
            <FooterComponent />
        </div>
    )
}

export default CheckoutScreen