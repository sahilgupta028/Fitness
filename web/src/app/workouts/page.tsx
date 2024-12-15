"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa";

interface Exercise {
  _id: string | null | undefined;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

const Page = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [bodyPart, setBodyPart] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [target, setTarget] = useState<string>("");

  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [equipmentList, setEquipmentList] = useState<string[]>([]);
  const [targets, setTargets] = useState<string[]>([]);

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get("/api/all-excercise");
        const exercisesData = response.data;
        setExercises(exercisesData);
        setFilteredExercises(exercisesData);

        setBodyParts([...new Set(exercisesData.map((exercise) => exercise.bodyPart))]);
        setEquipmentList([...new Set(exercisesData.map((exercise) => exercise.equipment))]);
        setTargets([...new Set(exercisesData.map((exercise) => exercise.target))]);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch exercises");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    const filtered = exercises.filter((exercise) => {
      return (
        (!bodyPart || exercise.bodyPart === bodyPart) &&
        (!equipment || exercise.equipment === equipment) &&
        (!target || exercise.target === target)
      );
    });
    setFilteredExercises(filtered);
  }, [bodyPart, equipment, target, exercises]);

  const openInstructionModal = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const closeInstructionModal = () => {
    setSelectedExercise(null);
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Exercise Library</h1>
        <p className="text-lg text-gray-600">Explore, Filter, and Learn Your Workouts</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <div className="relative">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            value={bodyPart}
            onChange={(e) => setBodyPart(e.target.value)}
            className="w-60 px-4 py-2 pl-10 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Filter by Body Part</option>
            {bodyParts.map((part) => (
              <option key={part} value={part}>
                {part}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-60 px-4 py-2 pl-10 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Filter by Equipment</option>
            {equipmentList.map((equip) => (
              <option key={equip} value={equip}>
                {equip}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-60 px-4 py-2 pl-10 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Filter by Target Muscle</option>
            {targets.map((tgt) => (
              <option key={tgt} value={tgt}>
                {tgt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{exercise.name}</h2>
              <p className="text-gray-600">
                <strong>Body Part:</strong> {exercise.bodyPart}
              </p>
              <p className="text-gray-600">
                <strong>Target:</strong> {exercise.target}
              </p>
              <p className="text-gray-600">
                <strong>Equipment:</strong> {exercise.equipment}
              </p>
              <div className="flex items-center justify-center">
              <button
                onClick={() => openInstructionModal(exercise)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Show Instructions
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredExercises.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <img
            src="/no-result.jpg"
            alt="No results found"
            className="mx-auto w-auto h-80 mb-4"
          />
          No exercises found. Try adjusting your filters.
        </div>
      )}

      {/* Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedExercise.name}</h2>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Instructions</h3>
            <ul className="list-disc list-inside text-gray-600">
              {selectedExercise.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
            <div className="flex items-center justify-center">
            <button
              onClick={closeInstructionModal}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
            >
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
