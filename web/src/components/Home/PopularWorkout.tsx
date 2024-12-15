"use client";

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

  const workouts: Workout[] = [
    {
      id: 1,
      title: "HIIT (High-Intensity Interval Training)",
      description:
        "Burn calories faster with short, intense bursts of exercise followed by recovery periods.",
      image: "/workout/hiit.jpg",
      details: `
        High-Intensity Interval Training (HIIT) is a cardiovascular exercise strategy alternating short periods of intense anaerobic exercise with less-intense recovery periods. It's an effective way to burn fat quickly and improve cardiovascular health.
      `,
      benefits: [
        "Rapid fat loss",
        "Improved metabolism",
        "Increased cardiovascular endurance",
        "Boosted stamina",
      ],
      duration: "20-30 minutes",
      equipment: "None or light dumbbells, kettlebells, resistance bands",
    },
    {
      id: 2,
      title: "Yoga & Flexibility",
      description:
        "Improve your balance and flexibility with our guided yoga sessions designed for all levels.",
      image: "/workout/yoga.jpg",
      details: `
        Yoga is a mind-body practice that combines physical postures, breathing exercises, and meditation. It helps improve flexibility, balance, and mental clarity, and it's ideal for reducing stress and promoting relaxation.
      `,
      benefits: [
        "Increased flexibility",
        "Enhanced balance and stability",
        "Stress relief and improved mental clarity",
        "Improved posture",
      ],
      duration: "45-60 minutes",
      equipment: "Yoga mat, blocks, straps (optional)",
    },
    {
      id: 3,
      title: "Strength Training",
      description:
        "Build muscle and boost your metabolism with targeted strength training workouts.",
      image: "/workout/strength.jpg",
      details: `
        Strength training involves using resistance to induce muscular contraction, which builds strength and muscle size. It can be done with free weights, resistance machines, or bodyweight exercises.
      `,
      benefits: [
        "Muscle building",
        "Increased bone density",
        "Boosted metabolism",
        "Enhanced stamina",
      ],
      duration: "45-60 minutes",
      equipment: "Dumbbells, barbells, resistance bands, machines",
    },
    {
      id: 4,
      title: "Pilates",
      description:
        "Focus on core strength, posture, and alignment with low-impact Pilates exercises.",
      image: "/workout/pilates.jpg",
      details: `
        Pilates is a low-impact exercise method that emphasizes body alignment, flexibility, and strength, particularly in the core. It involves precise movements and techniques to improve overall body function.
      `,
      benefits: [
        "Strengthened core muscles",
        "Improved posture and alignment",
        "Enhanced balance and coordination",
        "Increased flexibility",
      ],
      duration: "30-45 minutes",
      equipment: "Mat, Pilates ball, resistance bands (optional)",
    },
    {
      id: 5,
      title: "Cardio Workouts",
      description:
        "Elevate your heart rate and improve endurance with our effective cardio exercises.",
      image: "/workout/cardio.jpg",
      details: `
        Cardio exercises involve activities that increase your heart rate and improve the efficiency of your cardiovascular system. These exercises help in burning calories, improving endurance, and strengthening the heart.
      `,
      benefits: [
        "Improved cardiovascular health",
        "Enhanced stamina",
        "Weight loss",
        "Reduced stress and anxiety",
      ],
      duration: "30-60 minutes",
      equipment: "Treadmill, jump rope, elliptical, stationary bike",
    },
    {
      id: 6,
      title: "CrossFit",
      description:
        "Challenge yourself with high-intensity functional movements for maximum performance.",
      image: "/workout/crossfit.jpg",
      details: `
        CrossFit is a branded fitness program created by Greg Glassman that combines elements of high-intensity interval training (HIIT), Olympic weightlifting, plyometrics, powerlifting, gymnastics, and other exercises to create varied and intense workouts.
      `,
      benefits: [
        "Builds full-body strength",
        "Improves endurance and cardiovascular health",
        "Enhances functional fitness for everyday activities",
        "Increases muscle mass and metabolism",
      ],
      duration: "40-60 minutes",
      equipment: "Barbells, kettlebells, resistance bands, medicine balls",
    },
  ];

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
