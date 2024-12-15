"use client";

import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    image: "/john.jpg", // Replace with actual image URL
    feedback:
      "I’ve been using this platform for 6 months, and my fitness level has improved drastically. The personalized workout plans and expert advice have helped me stay on track and reach my goals.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    image: "/jane.jpg", // Replace with actual image URL
    feedback:
      "The 1-on-1 coaching and progress tracking tools are fantastic! I love how tailored everything is, making it feel like a personalized experience.",
    rating: 5,
  },
  {
    name: "Robert Johnson",
    image: "/robert.jpg", // Replace with actual image URL
    feedback:
      "The community challenges have been a great motivator! I’m now more consistent with my workouts, and the support I receive from the community is invaluable.",
    rating: 4,
  },
  {
    name: "Michael Lee",
    image: "/michael.jpg", // Replace with actual image URL
    feedback:
      "The platform is easy to use, and the daily workouts are just what I needed to stay in shape. The results have been amazing!",
    rating: 5,
  },
  {
    name: "Emily Davis",
    image: "/emily.jpg", // Replace with actual image URL
    feedback:
      "I love the community and the challenges. It keeps me motivated and accountable, and the personalized feedback is great!",
    rating: 5,
  },
];

const Testimonials = () => {
    const settings = {
      dots: true,
      infinite: true,
      loop: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
      ],
    };
  
    return (
      <div className="max-w-6xl mx-auto my-20 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          What <span className='text-orange-600'>Our Users Say</span>
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4">
              <div className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl p-8 flex flex-col items-center w-80 h-96 mx-auto transition transform hover:-translate-y-2 hover:shadow-2xl">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-lg mb-6"
                />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500 text-center text-sm leading-relaxed mb-4 px-4 overflow-hidden overflow-ellipsis h-24">
                  {testimonial.feedback}
                </p>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-lg" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default Testimonials;