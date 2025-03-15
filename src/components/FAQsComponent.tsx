import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="w-full text-left p-4 flex justify-between items-center bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-md">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQsComponent: React.FC = () => {
  // FAQsComponent data
  const faqItems = [
    {
      question: "Where is the location?",
      answer: "Our main headquarters is located in Yangon, Myanmar. We also have satellite offices in several major cities across the region to better serve our customers."
    },
    {
      question: "How does your AI surveillance technology work?",
      answer: "Our AI surveillance technology uses advanced computer vision algorithms and machine learning models to detect and track objects, recognize patterns, and identify unusual activities. The system processes video feeds in real-time and can alert users to potential security concerns."
    },
    {
      question: "What makes your cameras different from regular security cameras?",
      answer: "Our AI-powered cameras offer intelligent features beyond traditional security cameras, including person detection, facial recognition (where legally permitted), unusual activity alerts, and integration with smart home systems. They also provide better video quality and more efficient storage options."
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we provide professional installation services for both residential and commercial customers. Our trained technicians will ensure your system is properly installed, configured, and optimized for your specific security needs."
    }
  ];

  return (
    <section className="py-32 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div>
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsComponent;