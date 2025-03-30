import React from 'react';

const AchievementsComponent: React.FC = () => {
  return (
    <section className="py-24 px-4 container mx-auto">
      <h2 className="text-3xl md:text-3xl font-semibold text-center mb-12">
        Our Achievements
      </h2>
      
      <div className="max-w-6xl mx-auto mb-6">
        <h3 className="font-medium mb-8 text-center">
         _ 2023 _
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
          
          <div className="rounded-xl overflow-hidden">
            <img 
              src="/assets/e1.png" 
              alt="Team receiving an award on stage" 
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-24">
        <p className="text-lg leading-relaxed">
          Won the Best Security Camera for Home
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-6">
        <h3 className="font-medium mb-8 text-center">
         _ 2024 _
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
          
          <div className="rounded-xl overflow-hidden">
            <img 
              src="/assets/e1.png" 
              alt="Team receiving an award on stage" 
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-24">
        <p className="text-lg leading-relaxed">
          Won the Best Security Camera for Street 
        </p>
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