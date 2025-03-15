import React from 'react';

const CoreValuesComponent: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-sky-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Our Values
        </h2>
        
        <div className="grid grid-cols-1 gap-16">
          {/* Mission */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Mission
            </h3>
            <p className="max-w-md mx-auto">
              To provide advanced AI-driven security solutions that ensure 
              safety, convenience, and peace of mind for homes, businesses, 
              and public spaces.
            </p>
          </div>
          
          {/* Aim */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Aim
            </h3>
            <div className="max-w-md mx-auto">
              <p>To enhance Security</p>
              <p>To innovate AI Technology</p>
              <p>To ensure Privacy & Reliability</p>
              <p>To make Security Accessible</p>
            </div>
          </div>
          
          {/* Vision */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Vision
            </h3>
            <p className="max-w-md mx-auto">
              To become a global leader in AI-powered surveillance, 
              transforming security with intelligent tracking and real-time 
              protection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValuesComponent;