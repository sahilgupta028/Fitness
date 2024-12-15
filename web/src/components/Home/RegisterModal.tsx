"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon

interface RegisterModalProps {
  closeDialog: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ closeDialog }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-gray-900 p-8 rounded-lg w-96 max-w-md shadow-lg relative">
        {/* Cross Button */}
        <button
          onClick={closeDialog}
          className="absolute top-4 right-4 text-gray-600 hover:text-orange-600"
          aria-label="Close"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Modal Header */}
        <h3 className="text-2xl font-bold mb-4 text-orange-600 text-center">Register Now</h3>

        {/* Registration Form */}
        <form className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Height */}
          <input
            type="number"
            placeholder="Height (in cm)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Weight */}
          <input
            type="number"
            placeholder="Weight (in kg)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Fitness Goal */}
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            <option value="">Select Your Fitness Goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-md transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
