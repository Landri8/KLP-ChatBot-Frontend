import React from 'react';

const AchievementsComponent: React.FC = () => {
  return (
    <section className="py-24 px-4 container mx-auto">
      <h2 className="text-3xl md:text-3xl font-semibold text-center mb-12">
        Our Achievements
      </h2>
      
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="font-medium mb-8">
          Won the Best AI-Powered Surveillance <br /> Technology in 2023
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Award Ceremony Image */}
          <div className="rounded-xl overflow-hidden">
            <img 
              src="/assets/e1.png" 
              alt="Team receiving an award on stage" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          {/* Trophy Image */}
          <div className="rounded-xl overflow-hidden">
            <img 
              src="/assets/e2.png" 
              alt="Gold trophy award for AI technology" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          {/* Coming Soon Placeholder */}
          <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
            <p className="text-xl font-medium">COMING SOON!</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg leading-relaxed">
          Trusted by thousands of customers, TCU has successfully deployed AI-powered security cameras across homes, 
          streets, and businesses, enhancing safety with cutting-edge surveillance technology.
        </p>
      </div>
    </section>
  );
};

export default AchievementsComponent;