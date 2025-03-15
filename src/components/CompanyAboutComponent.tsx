import React from 'react';

const CompanyAboutComponent: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-10 md:mb-16 leading-tight">
          A leading provider of AI-powered security cameras designed for both home and street surveillance.
        </h1>
        
        {/* Main image */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <video 
            autoPlay
            loop
            muted
            src="/assets/company.mp4" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Company info */}
        <div className="max-w-[800px] grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Location</h3>
            <p className="font-medium">Yangon, Myanmar</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Company Size</h3>
            <p className="font-medium">100 - 1000 Employees</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Hot Number</h3>
            <p className="font-medium">+811 1234 88231</p>
          </div>
        </div>

        <div>
          <p className='text-[18px] w-full lg:w-1/2 ms-auto my-20 lg:text-end'>Our advanced cameras feature 360-degree coverage, real-time AI motion detection, and facial recognition, ensuring maximum security and peace of mind, Originally focused on home security,</p>
          <p className='text-[18px] w-full lg:w-1/2 me-auto my-20'>We have expanded to offer street-compatible solutions, making neighborhoods safer with smart, AI-driven monitoring. At TCU, we are committed to innovation, reliability, and providing top-tier security solutions for every environment.</p>
        </div>
      </div>
    </section>
  );
};

export default CompanyAboutComponent;