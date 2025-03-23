import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductImage {
  src: string;
  alt: string;
  isThumb?: boolean;
}

const ProductDetailsComponent: React.FC = () => {
  const productImages: ProductImage[] = [
    {
      src: "/assets/c13.jpg",
      alt: "TCU Smart Battery Video Doorbell - front view"
    },
    {
      src: "/assets/c13.jpg",
      alt: "TCU Smart Battery Video Doorbell - features overview",
      isThumb: true
    },
    {
      src: "/assets/pd2.jpg",
      alt: "TCU Smart Battery Video Doorbell - night vision demo",
      isThumb: true
    },
    {
      src: "/assets/pd3.jpg",
      alt: "TCU Smart Battery Video Doorbell - field of view comparison",
      isThumb: true
    }
  ];

  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="mb-4">
              {/* Main product image - using placeholder */}
              <div className="rounded-lg h-96 flex items-center justify-center mb-4">
                {/* <span className="text-gray-400">Main Product Image</span> */}
                {/* Uncomment for actual image */}
                <img 
                  src={mainImage.src} 
                  alt={mainImage.alt} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Thumbnail images */}
              <div className="grid grid-cols-3 gap-2">
                {productImages.filter(img => img.isThumb).map((image, index) => (
                  <div 
                    key={index}
                    className="bg-gray-100 rounded cursor-pointer h-24 flex items-center justify-center"
                    onClick={() => setMainImage(image)}
                  >
                    {/* Uncomment for actual thumbnails */}
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-6">TCU Smart Battery Video Doorbell</h1>
            
            <div className="space-y-6">
              <ul className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">2K 5MP Live View:</h3>
                    <p>Always know what happens in front of your door through the Tapo app. With the starlight sensor and 2K 5MP resolution, check all the fine details captured even in low-light environments.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Color Night Vision:</h3>
                    <p>With the embedded spotlight and starlight sensor, Tapo D230S1 reveals high-fidelity details and color at night.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Head-to-Toe View:</h3>
                    <p>With the camera's ultra-wide FOV(160° Diagonal), Tapo 4:3 live view ensures users can check visitors from head-to-toe as close as 1m1, which shows more vertical details than other 16:9 doorbells'.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Flexible Placement, Flexible Views:</h3>
                    <p>Different wedge choices allow users to make the doorbell suits more placement scenarios. Users can also use wedges to adjust the views.</p>
                  </div>
                </li>
              </ul>
              
              {/* Additional features - can be expanded */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-bold mb-4">Additional Features</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Motion Detection</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Two-Way Audio</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>IP65 Weatherproof</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cloud Storage</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Long Battery Life</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Easy Installation</span>
                  </li>
                </ul>
              </div>
              
              {/* Call to action buttons */}
              <div className="pt-6 flex flex-wrap gap-4">
                <Link to="/checkout" className="cursor-pointer px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                  Buy Now
                </Link>
                <button className="cursor-pointer px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  See Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsComponent;