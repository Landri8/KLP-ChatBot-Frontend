import React from 'react';

interface NewsItem {
  title: string;
  isActive?: boolean;
}

interface BlogPostProps {
  title: string;
  date: string;
  content: React.ReactNode;
  image?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, date, content, image }) => {
  return (
    <div className="mx-auto pb-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main content area */}
        <main className="w-full">
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{date}</p>
          
          {image && (
            <div className="mb-8 w-full">
              <img 
                src={image} 
                alt="Featured image for blog post" 
                className="w-full rounded-md"
              />
            </div>
          )}
          
          <div className="prose max-w-none">
            {content}
          </div>
        </main>
      </div>
    </div>
  );
};

const BlogsComponent: React.FC = () => {
  // Sample related news
  const relatedNews: NewsItem[] = [
    {
      title: "S Korea removes Deepseek from...",
      isActive: true
    },
    {
      title: "UK competition watchdog drops..."
    },
    {
      title: "Are Scottish students using AI t..."
    }
  ];
  
  // Sample blog content
  const blogContent = (
    <>
      <p className="mb-4">South Korea has banned new downloads of China's DeepSeek artificial intelligence (AI) chatbot, according to the country's personal data protection watchdog.</p>
      
      <p className="mb-4">The government agency said the AI model will become available again to South Korean users when "improvements and remedies" are made to ensure it complies with the country's personal data protection law.</p>
      
      <p className="mb-4">In the week after it made global headlines, DeepSeek became hugely popular in South Korea leaping to the top of app stores with over a million weekly users.</p>
      
      <p className="mb-4">But its rise in popularity also attracted scrutiny from countries around the world which have imposed restrictions on the app over privacy and national security concerns.</p>
      
      <p className="mb-4">South Korea's Personal Information Protection Commission said the DeepSeek app became unavailable on Apple's App Store and Google Play on Saturday evening. It came after several South Korean government agencies banned their employees from downloading the application to their work devices.</p>
      
      <p className="mb-4">South Korea's acting president Choi Sang-mok has described Deepseek as a "shock" that could impact the country's industries, beyond AI.</p>
      
      <p className="mb-4">Despite the suspension of new downloads, people who already have it on their phones will be able to continue using it or they may just access it via DeepSeek's website.</p>
    </>
  );

  const blogContent2 = (
    <>
        <p className="mb-4">The UK competition watchdog has ended its investigation into the partnership between Microsoft and the maker of ChatGPT, OpenAI.</p>
        
        <p className="mb-4">The Competition and Markets Authority (CMA) was looking into whether Microsoft's relationship with what is the world's best known artificial intelligence (AI) firm changed after the turmoil which saw its boss Sam Altman fired and then rehired.</p>
        
        <p className="mb-4">The CMA has concluded that, despite Microsoft investing billions of dollars into OpenAI and having exclusive uses of some of its AI products, the partnership remains the same, so is not subject to review under the UK's merger rules.</p>
        
        <p className="mb-4">Digital rights campaigners, Foxglove, said it showed the CMA had been "defanged."</p>
        
        <p className="mb-4">The CMA opened the probe in December 2023, after Microsoft had put pressure on OpenAI to re-employ Mr Altman, days after he had been sacked.</p>
        
        <p className="mb-4">"In view of Microsoft's potentially important role in securing Sam Altman's re-appointment, the CMA believed there was a reasonable chance that an investigation would reveal that Microsoft had increased its control over OpenAI's commercial policy," the watchdog said.</p>
        
        <p className="mb-4">But on Wednesday, it concluded Microsoft "exerts a high level of material influence" over OpenAI's commercial policy without fully controlling it.</p>
        
        <p className="mb-4">"Because this change of control has not happened, the partnership in its current form does not qualify for review under the UK's merger control regime," CMA Executive Director for Mergers Joel Bamford posted in an article on LinkedIn.</p>
        
        <p className="mb-4">But he added: "The CMA's findings on jurisdiction should not be read as the partnership being given a clean bill of health on potential competition concerns; but the UK merger control regime must of course operate within the remit set down by Parliament."</p>
    </>
  )
  
  return (
    <div className="min-h-screen bg-white">
        <div className='container mx-auto max-w-6xl flex flex-col-reverse lg:flex-row gap-10 px-6'>
            <div className='lg:py-4 w-full lg:w-8/12'>
                <BlogPost 
                    title="S Korea removes Deepseek from app stores over privacy concerns"
                    date="17 February 2025"
                    content={blogContent}
                    image="/assets/ds.png"
                />
                <div className='h-[0.8px] w-full bg-gray-200 mb-8'></div>
                <BlogPost 
                    title="UK competition watchdog drops Microsoft-OpenAI probe"
                    date="17 February 2025"
                    content={blogContent2}
                    image="/assets/ms.png"
                />
            </div>
            <aside className="w-full lg:w-4/12">
                <div className="sticky top-24">
                    <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="mb-4">
                        {relatedNews.map((news, index) => (
                        <div key={index} className="mb-4">
                            <a 
                            href="#" 
                            className={`block hover:text-blue-900 ${news.isActive ? 'font-semibold' : ''}`}
                            >
                            {news.isActive && (
                                <span className="inline-block mr-2">▶</span>
                            )}
                            {news.title}
                            </a>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
  );
};

export default BlogsComponent;