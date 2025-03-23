import React from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, description, imageUrl }) => {
  return (
    <Link to={`/products/details`} title='Learn more' className="flex flex-col items-center cursor-pointer">
      <div className="w-40 h-40 mb-4 flex items-center justify-center">
        {/* Placeholder for product image */}
        <div className="rounded-lg w-full h-full flex items-center justify-center">
          {/* Uncomment when you have real images */}
          <img src={imageUrl} alt={name} className="max-w-full max-h-full object-contain" />
        </div>
      </div>
      
      <h3 className="font-medium text-center mb-1">{id}</h3>
      <p className="text-sm text-center text-gray-700">{description}</p>
      
    </Link>
  );
};

const TopSellingComponent: React.FC = () => {
  const products = [
    {
      id: "TCD 24",
      name: "Smart Home Security Camera",
      description: "Smart Home Security Wifi Camera",
      imageUrl: "/assets/c6.jpg"
    },
    {
      id: "TSE 22",
      name: "Indoor/Outdoor Security Camera",
      description: "Tapo Indoor/Outdoor Wi-Fi Home Security Camera",
      imageUrl: "/assets/c7.png"
    },
    {
      id: "TBE 22",
      name: "Video Doorbell",
      description: "Video Doorbell Camera",
      imageUrl: "/assets/c8.png"
    },
    {
      id: "TYU 25",
      name: "Wireless AI Camera",
      description: "Wireless AI-powered Security Camera",
      imageUrl: "/assets/c9.png"
    },
    // Duplicate set for the second row
    {
      id: "TCD 24",
      name: "Smart Home Security Camera",
      description: "Smart Home Security Wifi Camera",
      imageUrl: "/assets/c10.png"
    },
    {
      id: "TSE 22",
      name: "Indoor/Outdoor Security Camera",
      description: "Tapo Indoor/Outdoor Wi-Fi Home Security Camera",
      imageUrl: "/assets/c11.png"
    },
    {
      id: "TBE 22",
      name: "Video Doorbell",
      description: "Video Doorbell Camera",
      imageUrl: "/assets/c12.jpg"
    },
    {
      id: "TYU 25",
      name: "Wireless AI Camera",
      description: "Wireless AI-powered Security Camera",
      imageUrl: "/assets/c13.jpg"
    }
  ];

  // Only display the first 8 products initially
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-32 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Top-selling Products
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 mb-10">
          {displayProducts.map((product, index) => (
            <ProductCard
              key={index}
              id={product.id}
              name={product.name}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="#" 
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
};

export default TopSellingComponent;