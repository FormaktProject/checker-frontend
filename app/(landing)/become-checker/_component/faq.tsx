import { useState } from "react";

const CheckerFaq = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const faqContent = [
    {
      id: 1,
      title: "What qualifications do I need to become a checker?",
      content: `To become a checker on our platform, you need excellent attention to detail, 
            basic knowledge of accommodation standards, and the ability to provide honest, 
            constructive feedback. No formal qualifications required - just a passion for 
            helping travelers find quality accommodations.`,
    },
    {
      id: 2,
      title: "How does the accommodation checking process work?",
      content: `As a checker, you'll visit assigned accommodations in your area, evaluate 
            them based on our comprehensive checklist covering cleanliness, amenities, 
            location, and overall guest experience. You'll then submit detailed reports 
            with photos and ratings through our platform.`,
    },
    {
      id: 3,
      title: "How much can I earn as a checker?",
      content: `Earnings vary based on location and number of checks completed. On average, 
            checkers earn $25-75 per accommodation review, depending on property size and 
            complexity. Active checkers typically earn $300-800 monthly, with top performers 
            earning even more.`,
    },
    {
      id: 4,
      title: "What areas and types of properties can I check?",
      content: `Our platform covers accommodations worldwide - from hotels and hostels to 
            vacation rentals and bed & breakfasts. You can check properties in your local 
            area or while traveling. We're especially looking for checkers in popular 
            tourist destinations and major cities.`,
    },
    {
      id: 5,
      title: "How do I get started and what's the application process?",
      content: `Simply fill out our online application, complete a brief training module, 
            and pass a sample accommodation evaluation. Once approved, you'll gain access 
            to available checking assignments in your area. The entire process typically 
            takes 3-5 business days.`,
    },
  ];

  const toggleAccordion = (id:number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {faqContent.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-white px-6 py-5 border-b border-gray-100">
            <button
              className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
              onClick={() => toggleAccordion(item.id)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-5">
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === item.id ? 'rotate-45' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 pr-4">
                  {item.title}
                </h3>
              </div>
              <div className="flex-shrink-0">
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openAccordion === item.id ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
          </div>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openAccordion === item.id 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-700 leading-relaxed pl-15">
                {item.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckerFaq;