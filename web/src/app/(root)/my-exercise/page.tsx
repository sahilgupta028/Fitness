"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ShimmerEffect } from "@/components/workouts/Shimmer";
import LoginRequired from "@/components/common/Login-required";
import { motion } from "framer-motion";

interface Exercise {
  name: string;
  date: string;
  timer: number;
  bodyPart: string;
  equipment: string;
  target: string;
  secondaryMuscles: string[];
  gifUrl: string;
}

const Exercise: React.FC = () => {
  const { data: session, status } = useSession();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!session?.user?._id) return;

      try {
        const response = await axios.get(`/api/get-my-exercise?id=${session.user._id}`);
        setExercises(response.data.exercises || []);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch exercises.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchExercises();
    }
  }, [session, status]);

  if (loading) return <ShimmerEffect />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!session) return <LoginRequired />;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-8">
          Total Exercises
        </h1>
        {exercises.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No exercises logged for today. Start your fitness journey now!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-start bg-gray-200 border border-white rounded-lg shadow-md p-5 hover:shadow-xl transition-all duration-300 relative"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="rounded-md mb-4 object-cover w-auto h-auto"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-2">{exercise.name}</h2>
                <p className="text-sm text-gray-600 capitalize mb-1">
                  <span className="font-medium">Body Part:</span> {exercise.bodyPart}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Equipment:</span> {exercise.equipment}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Target:</span> {exercise.target}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Secondary Muscles:</span> {exercise.secondaryMuscles.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Duration:</span> {exercise.timer} seconds
                </p>
                <div className="absolute bottom-4 right-4 bg-indigo-100 text-indigo-600 text-xs py-1 px-2 rounded-full shadow">
                  <span className="font-medium">Date:</span> {exercise.date}
                </div>
                {/* <button className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                  Start Exercise
                </button> */}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercise;
