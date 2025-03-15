import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  imgUrl: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex justify-center mb-3">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  rating,
  imgUrl
}) => {
  return (
    <div className="bg-gray-100 rounded-lg p-8 mb-6">
      {/* Avatar placeholder */}
      <div className="flex justify-center mb-4">
        <img className='w-16 h-16 bg-gray-300 rounded-full' src={imgUrl} alt="" />
      </div>
      
      {/* Star rating */}
      <StarRating rating={rating} />
      
      {/* Testimonial text */}
      <p className="text-center mb-4">{quote}</p>
      
      {/* Author info */}
      <p className="text-center text-gray-600">
        - {author}, {role}
      </p>
    </div>
  );
};

const TestimonialsComponent: React.FC = () => {
  // Testimonial data
  const testimonials = [
    {
      quote: "The TCU 28 has transformed our home security. The AI tracking is incredibly accurate, and the 360° coverage leaves no blind spots. Highly recommended!",
      author: "James R.",
      role: "Homeowner",
      rating: 5,
      imgUrl: '/assets/cu1.jpg'
    },
    {
      quote: "We installed TCU cameras at our storefront, and the real-time alerts have helped prevent theft. The facial recognition is a fantastic feature!",
      author: "Sophia M.",
      role: "Business Owner",
      rating: 5,
      imgUrl: '/assets/cu2.jpg'
    },
    {
      quote: "As a property manager, I've installed TCU cameras across multiple buildings. The cloud storage and remote viewing capabilities make monitoring simple and effective.",
      author: "Michael T.",
      role: "Property Manager",
      rating: 5,
      imgUrl: '/assets/cu3.jpg'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Pleased Customers Says
        </h2>
        
        <div>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              imgUrl={testimonial.imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsComponent;