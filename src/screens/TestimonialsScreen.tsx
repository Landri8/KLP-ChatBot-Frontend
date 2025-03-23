import React, { useEffect } from 'react'
import TestimonialsComponent from '../components/TestimonialsComponent'
import NavBarComponent from '../components/NavBarComponent'
import FooterComponent from '../components/FooterComponent'
import ChatBotComponent from '../components/ChatbotComponent'

const TestimonialsScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <NavBarComponent />
            <ChatBotComponent />
            <div className='my-32'></div>
            <TestimonialsComponent />
            <FooterComponent />
        </div>
    )
}

export default TestimonialsScreen