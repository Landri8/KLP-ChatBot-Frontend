import React from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  learnMoreUrl: string;
  imageOnRight?: boolean;
}

const ProductItem: React.FC<ProductProps> = ({
  name,
  description,
  imageUrl,
  imageAlt,
  learnMoreUrl,
  imageOnRight = false
}) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 mb-20 ${imageOnRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {/* Text Content */}
      <div className={`md:w-1/2`}>
        <div className="max-w-md mx-auto md:mx-0">
          <p className="mb-4">
            {description}
          </p>
          <Link 
            to={learnMoreUrl}
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Product Image */}
      <div className={`md:w-1/2 ${imageOnRight ? 'order-2' : 'order-2 md:order-2'}`}>
        <div className="w-64 h-64 mx-auto">
          {/* Placeholder for product image */}
            <img src={imageUrl} alt={imageAlt} className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

const FeaturedProductsComponent: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "TCU-28 Indoor Camera",
      description: "The new TCU 28 automatically tracks suspicious movements with AI precision and 360° coverage, ensuring advanced security for homes and streets.",
      imageUrl: "/assets/c4.png",
      imageAlt: "TCU-28 Indoor Security Camera",
      learnMoreUrl: "/products/details",
      imageOnRight: true
    },
    {
      id: 2,
      name: "TCU-28 Mini",
      description: "The new TCU 28 automatically tracks suspicious movements with AI precision and 360° coverage, ensuring advanced security for homes and streets.",
      imageUrl: "/assets/c2.png",
      imageAlt: "TCU-28 Mini Security Camera",
      learnMoreUrl: "/products/details",
      imageOnRight: false
    },
    {
      id: 3,
      name: "TCU-28 Outdoor Camera",
      description: "The new TCU 28 automatically tracks suspicious movements with AI precision and 360° coverage, ensuring advanced security for homes and streets.",
      imageUrl: "/assets/c5.jpg",
      imageAlt: "TCU-28 Outdoor Security Camera",
      learnMoreUrl: "/products/details",
      imageOnRight: true
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-16">
          Other Featured Products
        </h2>
        
        {products.map(product => (
          <ProductItem
            key={product.id}
            name={product.name}
            description={product.description}
            imageUrl={product.imageUrl}
            imageAlt={product.imageAlt}
            learnMoreUrl={product.learnMoreUrl}
            imageOnRight={product.imageOnRight}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProductsComponent;