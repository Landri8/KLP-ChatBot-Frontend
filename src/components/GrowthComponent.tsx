import React from 'react';

const GrowthComponent: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className='flex items-center justify-center gap-10'>
            <div className='text-center'>
                <h3 className='text-5xl font-semibold mb-6'>1000% +</h3>
                <p className='text-zinc-800'>Company revenue from
                start</p>
            </div>

            <div className='text-center'>
                <h3 className='text-5xl font-semibold mb-6'>60+</h3>
                <p className='text-zinc-800'>Models</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthComponent;