import React from 'react'

const LatestProductComponent = () => {
  return (
    <section className="px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="relative w-full md:w-[80%] mx-auto mb-16">
          <img 
            src="/assets/h1.png" 
            alt="Product Image with Annotations" 
            className="w-full h-auto"
          />
        </div>
        
        {/* Product Description */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            TCU - 28
          </h2>
          <p className="mb-6">
            The new TCU 28 automatically tracks suspicious movements with AI precision and 360° coverage, 
            ensuring advanced security for homes and streets.
          </p>
          <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}

export default LatestProductComponent