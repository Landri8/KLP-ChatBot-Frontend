import React from 'react';

const IntegrationStatsComponent: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
          We've integrated in almost<br />1,000 places
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Image grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top row images */}
            <div className="overflow-hidden">
              <div className="w-full flex items-center justify-center">
                {/* Uncomment for actual image */}
                <img 
                  src="/assets/i1.png" 
                  alt="Security camera mounted on a building exterior" 
                  className="w-full object-cover"
                />
              </div>
            </div>
            
            <div className="overflow-hidden">
              <div className="w-full flex items-center justify-center">
                {/* Uncomment for actual image */}
                <img 
                  src="/assets/i2.png" 
                  alt="Indoor security camera in a living room" 
                  className="w-full object-cover"
                />
              </div>
            </div>
            
            {/* Bottom row images */}
            <div className="overflow-hidden">
              <div className="w-full flex items-center justify-center">
                {/* Uncomment for actual image */}
                <img 
                  src="/assets/i3.png" 
                  alt="Security camera overlooking a city" 
                  className="w-full object-cover"
                />
              </div>
            </div>
            
            <div className="overflow-hidden">
              <div className="w-full flex items-center justify-center">
                {/* Uncomment for actual image */}
                <img 
                  src="/assets/i4.png"
                  alt="Dome security camera in an industrial setting" 
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Right side - Stats */}
          <div className="flex flex-col justify-center items-end space-y-16">
            {/* First stat */}
            <div className="text-center lg:text-end">
              <h3 className="text-5xl md:text-6xl font-semibold mb-2">100%</h3>
              <p className="text-lg md:text-xl">Customer satisfaction</p>
            </div>
            
            {/* Second stat */}
            <div className="text-center lg:text-end">
              <h3 className="text-5xl md:text-6xl font-semibold mb-2">99.99%</h3>
              <p className="text-lg md:text-xl">Availability and Reliability</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationStatsComponent;