/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import axios from "axios";

const ExerciseRecommendation: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
  });
  const [exercises, setExercises] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/exercise-recommendation", userDetails);
      console.log(response.data.exercise);
      setExercises(response.data.exercise);
    } catch (err: any) {
      setError("Error fetching exercise recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Submit Your Details for Exercise Recommendation</h1>
        
        <input
          type="text"
          name="age"
          value={userDetails.age}
          onChange={handleChange}
          placeholder="Age"
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="weight"
          value={userDetails.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="height"
          value={userDetails.height}
          onChange={handleChange}
          placeholder="Height (cm)"
          className="block w-full p-2 border rounded mb-4"
        />
        <input
          type="text"
          name="goal"
          value={userDetails.goal}
          onChange={handleChange}
          placeholder="Goal (e.g., weight loss, muscle gain)"
          className="block w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {exercises && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold">Recommended Exercises</h2>
    <ul className="mt-4 space-y-2 list-disc list-inside">
    {/* {console.log(exercises)} */}
    <li className="text-gray-800">{exercises}</li>
      {/* {exercises.map((exercise, index) => (
        <li key={index} className="text-gray-800">{exercise}</li>
      ))} */}
    </ul>
  </div>
)}
    </div>
  );
};

export default ExerciseRecommendation;
