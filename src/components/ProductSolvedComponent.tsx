import React from 'react'

const ProductSolvedComponent = () => {
  return (
    <section className="pt-8 px-4 container mx-auto">
        <div className="max-w-6xl mx-auto">
       
        {/* Main image */}
        <div className="rounded-2xl overflow-hidden mb-8">
          <img 
            src="/assets/e3.png" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <p className='text-[18px] w-full lg:w-1/2 ms-auto my-20 lg:text-end'>Our products solve the most common nowadays problems with AI-powered smartness and preciseness</p>
          <p className='text-[18px] w-full lg:w-1/2 me-auto my-20'>The impact we made has gained a lot of achievements.</p>
        </div>
      </div>
    </section>
  )
}

export default ProductSolvedComponent