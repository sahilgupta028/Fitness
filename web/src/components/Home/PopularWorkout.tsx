"use client";

import { workouts } from "@/data/popularWorkout";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface Workout {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string;
  benefits: string[];
  duration: string;
  equipment: string;
}

export default function PopularWorkouts() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  

  const handleLearnMore = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseDialog = () => {
    setSelectedWorkout(null);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-orange-500 mb-8">
          Popular Workouts
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Discover our most popular workout programs designed to suit all
          fitness levels.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {workout.title}
                </h3>
                <p className="text-gray-600 mb-4">{workout.description}</p>
                <button
                  className="bg-orange-500 hover:bg-orange-400 text-white py-2 px-6 rounded-md text-sm transition-all duration-300"
                  onClick={() => handleLearnMore(workout)}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                {selectedWorkout.title}
              </h3>
              <button
                onClick={handleCloseDialog}
                className="text-gray-600 font-semibold text-lg"
              >
                <RxCross2 />
              </button>
            </div>
            <div>
              <p className="text-gray-600 mb-4">{selectedWorkout.details}</p>
              <div className="mb-4">
                <strong className="block text-gray-800">Benefits:</strong>
                <ul className="list-disc pl-5 text-gray-600">
                  {selectedWorkout.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-600 mb-4">
                <strong>Duration:</strong> {selectedWorkout.duration}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Equipment:</strong> {selectedWorkout.equipment}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
