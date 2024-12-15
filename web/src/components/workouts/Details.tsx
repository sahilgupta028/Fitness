import React from 'react';
import { FaDumbbell, FaBullseye, FaCogs } from 'react-icons/fa';

type ExerciseDetailProps = {
  exerciseDetail: {
    bodyPart: string;
    gifUrl: string;
    name: string;
    target: string;
    equipment: string;
  };
};

const Detail: React.FC<ExerciseDetailProps> = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: <FaDumbbell className="text-4xl text-orange-500" />, // Icon for Body Part
      name: bodyPart,
    },
    {
      icon: <FaBullseye className="text-4xl text-red-500" />, // Icon for Target
      name: target,
    },
    {
      icon: <FaCogs className="text-4xl text-blue-500" />, // Icon for Equipment
      name: equipment,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-16 p-6 items-center">
      <img
        src={gifUrl}
        alt={name}
        loading="lazy"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl lg:text-6xl font-bold capitalize">{name}</h1>
        <p className="text-lg lg:text-xl text-gray-700">
          Exercises keep you strong. <span className="capitalize">{name}</span> is one of the best
          exercises to target your <span className="capitalize">{target}</span>. It will help you
          improve your mood and gain energy.
        </p>
        <div className="flex flex-col gap-4">
          {extraDetail.map((item, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="p-4 bg-orange-100 rounded-full flex items-center justify-center w-24 h-24">
                {item.icon}
              </div>
              <span className="text-xl lg:text-2xl capitalize font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
