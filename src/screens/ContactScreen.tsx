import React, { useEffect } from 'react'
import ContactFormComponent from '../components/ContactFormComponent'
import FooterComponent from '../components/FooterComponent'
import NavBarComponent from '../components/NavBarComponent'
import ChatBotComponent from '../components/ChatbotComponent'

const ContactScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <NavBarComponent />
            <ChatBotComponent />
            <div className='my-32'></div>
            <ContactFormComponent />
            <FooterComponent />
        </div>
    )
}

export default ContactScreen