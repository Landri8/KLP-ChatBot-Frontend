import React, { useEffect } from 'react'
import TestimonialsComponent from '../components/TestimonialsComponent'
import NavBarComponent from '../components/NavBarComponent'
import FooterComponent from '../components/FooterComponent'

const TestimonialsScreen = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <NavBarComponent />
            <div className='my-32'></div>
            <TestimonialsComponent />
            <FooterComponent />
        </div>
    )
}

export default TestimonialsScreen