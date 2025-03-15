import React from 'react';

const HeroComponent: React.FC = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header and CTA Buttons */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8">
            AI-Powered Security for<br />a Safer Home.
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
              Learn More
            </button>
            <button className="px-6 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;