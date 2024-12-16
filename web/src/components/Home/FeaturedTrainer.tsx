"use client";

import { trainers } from "@/data/trainer";
import { useState } from "react";

interface Trainer {
  id: number;
  name: string;
  specialization: string;
  description: string;
  image: string;
  experience: string;
  certifications: string[];
  contact: {
    email: string;
  };
  testimonials: { client: string; feedback: string }[];
}

export default function FeaturedTrainer() {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  // Function to close the dialog
  const closeDialog = () => setSelectedTrainer(null);

  return (
    <section className="py-16 bg-gray-100">
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-orange-500 mb-8">
          Meet Our Featured Trainers
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Our trainers are here to guide you every step of the way. With their
          expertise, you can achieve your fitness goals faster and smarter.
        </p>

        {/* Trainer Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-80 object-cover rounded-md mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {trainer.name}
              </h3>
              <p className="text-orange-500 font-medium mb-4">
                {trainer.specialization}
              </p>
              <p className="text-gray-600 text-sm mb-6">
                {trainer.description}
              </p>
              <button
                onClick={() => setSelectedTrainer(trainer)}
                className="bg-orange-500 hover:bg-orange-400 text-white py-2 px-6 rounded-md text-sm transition-all duration-300"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Box */}
      {selectedTrainer && (
        <div
          className="fixed w-full md:w-fit inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="trainer-dialog-title"
          aria-describedby="trainer-dialog-description"
        >
          <div className="bg-white w-11/12 max-w-2xl rounded-lg p-8 relative shadow-xl">
            {/* Close Button */}
            <button
              onClick={closeDialog}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              aria-label="Close dialog"
            >
              &times;
            </button>

            {/* Trainer Details */}
            <h3
              id="trainer-dialog-title"
              className="text-3xl font-semibold text-gray-800 mb-2"
            >
              {selectedTrainer.name}
            </h3>
            <p className="text-orange-500 font-medium mb-4">
              {selectedTrainer.specialization}
            </p>
            <p id="trainer-dialog-description" className="text-gray-700 mb-6">
              {selectedTrainer.description}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Experience:</strong> {selectedTrainer.experience}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Certifications:</strong>{" "}
              {selectedTrainer.certifications.join(", ")}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Contact:</strong>{" "}
              <a
                href={`mailto:${selectedTrainer.contact.email}`}
                className="text-orange-500 underline"
              >
                {selectedTrainer.contact.email}
              </a>
            </p>
            <div className="text-gray-600 mb-4">
              <strong>Testimonials:</strong>
              <ul className="list-disc list-inside mt-2">
                {selectedTrainer.testimonials.map((testimonial, index) => (
                  <li key={index} className="text-sm">
                    <strong>{testimonial.client}:</strong> {testimonial.feedback}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
