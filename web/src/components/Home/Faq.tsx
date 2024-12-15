"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the best way to start exercising?",
    answer:
      "Begin with simple exercises like walking or stretching. Gradually increase intensity as your fitness improves.",
  },
  {
    question: "How many times a week should I work out?",
    answer:
      "For general fitness, aim for at least 3-5 workout sessions per week, including cardio and strength training.",
  },
  {
    question: "What is the importance of warming up?",
    answer:
      "Warming up prepares your muscles for exercise, reduces the risk of injury, and improves overall performance.",
  },
  {
    question: "How can I track my fitness progress?",
    answer:
      "You can track progress through regular measurements, maintaining a workout log, or using fitness apps.",
  },
];

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg transition-all duration-300"
            >
              <div 
                onClick={() => toggleFAQ(index)} 
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-100 transition duration-300 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                <span className="text-gray-600 text-2xl">
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;
