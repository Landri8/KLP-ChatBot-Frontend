import React from 'react';

const KeyFeaturesComponent: React.FC = () => {
  const features = [
    "AI Motion Detection",
    "Facial Recognition",
    "Real-time Alerts",
    "Remote Access via Web & Mobile App",
    "Night Vision & Cloud Storage"
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Key Features We Offer
        </h2>
        
        <div className="text-center">
          {features.map((feature, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesComponent;