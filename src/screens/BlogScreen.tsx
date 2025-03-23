import React, { useEffect } from 'react'
import BlogsComponent from '../components/BlogsComponent'
import NavBarComponent from '../components/NavBarComponent'
import FooterComponent from '../components/FooterComponent'
import ChatBotComponent from '../components/ChatbotComponent'

const BlogScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <NavBarComponent />
            <ChatBotComponent />
            <div className='my-32'></div>
            <BlogsComponent />
            <FooterComponent />
        </div>
    )
}

export default BlogScreen