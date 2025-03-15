import React from 'react';

interface FeatureProps {
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ title, description }) => {
  return (
    <li className="mb-6">
      <div className="flex">
        <div className="flex-shrink-0 mt-1">
          <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
        </div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-gray-800">{description}</p>
        </div>
      </div>
    </li>
  );
};

const SolvedProblemsComponents: React.FC = () => {
  const features = [
    {
      title: "Ultra-High Definition Video:",
      description: "Captures every detail with ultra-high 3MP resolution, ensuring unparalleled clarity in your recordings."
    },
    {
      title: "Advanced Night Vision:",
      description: "Offers exceptional night vision capabilities, providing clear visuals for up to 40 feet, even in complete darkness."
    },
    {
      title: "Person Detection and Notifications:",
      description: "Smart detection technology identifies human movement, promptly alerting you via notifications."
    },
    {
      title: "Sound and Light Alarm:",
      description: "Equipped with an integrated alarm system that triggers light and sound effects to deter unwelcome visitors."
    },
    {
      title: "Two-Way Audio:",
      description: "Facilitates real-time communication with a built-in microphone and speaker, allowing for instant interaction or deterrence."
    },
    {
      title: "Safe Storage:",
      description: "Provides secure local storage of up to 512GB on a microSD card, safeguarding your footage from potential data breaches."
    },
    {
      title: "Easy Setup and Management:",
      description: "Streamlines device management with the intuitive Tapo app, making setup and daily use a breeze"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-8 md:px-12">
        <h2 className="text-3xl font-semibold text-center mb-12">
          We solved the problems with
        </h2>
        
        <ul className="pl-6 pr-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SolvedProblemsComponents;