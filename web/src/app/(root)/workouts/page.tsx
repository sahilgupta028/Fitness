/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import LoginRequired from "@/components/common/Login-required";
import { FilterSelect } from "@/components/workouts/FilterSelect";
import { ShimmerEffect } from "@/components/workouts/Shimmer";
import NoResult from "@/components/workouts/NoResult";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

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
  const [timer, setTimer] = useState<number>(0);
  const [isTiming, setIsTiming] = useState<boolean>(false);

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

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isTiming) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTiming]);

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsTiming(true);
    setTimer(0);
  };

  const stopExercise = async () => {
    setIsTiming(false);

    toast.loading("Loading...");

    if (selectedExercise) {

      const dateInIndianFormat = moment().format("DD-MM-YYYY");

      try {
        await axios.post(`/api/save-exercise`, {
          id: session?.user?._id,
          exerciseId: selectedExercise._id,
          duration: timer,
          date: dateInIndianFormat,
          exerciseName: selectedExercise.name,
          bodyPart: selectedExercise.bodyPart,
        });
        
        toast.dismiss();
        toast.success("Exercise data saved!");
      } catch (err) {
        toast.error("Failed to save exercise data.");
      }
    }
    setSelectedExercise(null);
    setTimer(0);
  };

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <ShimmerEffect />;
  }

  if (!session) {
    return <LoginRequired />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">

      <Toaster />

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Exercise Library</h1>
        <p className="text-lg text-gray-600">Explore, Filter, and Learn Your Workouts</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <FilterSelect
          label="Body Part"
          options={bodyParts}
          value={bodyPart}
          onChange={(e) => setBodyPart(e.target.value)}
        />
        <FilterSelect
          label="Equipment"
          options={equipmentList}
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        />
        <FilterSelect
          label="Target Muscle"
          options={targets}
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
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
              className="w-full h-auto object-cover"
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
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={() => startExercise(exercise)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                >
                  {isTiming ? "Restart Exercise" : "Start Exercise"}
                </button>
                {selectedExercise && selectedExercise._id === exercise._id && (
                  <button
                    onClick={stopExercise}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                  >
                    Stop Exercise
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredExercises.length === 0 && <NoResult />}

      {/* Timer Display */}
      {selectedExercise && isTiming && (
        <div className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Current Exercise: {selectedExercise.name}</h3>
          <p>Time: {Math.floor(timer / 60)} min {timer % 60} sec</p>
        </div>
      )}
    </div>
  );
};

export default Page;
