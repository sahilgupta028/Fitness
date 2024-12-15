"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon

interface LoginModalProps {
  closeDialog: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeDialog }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-gray-900 p-8 rounded-lg w-96 max-w-md shadow-lg relative">
        {/* Cross Button */}
        <button
          onClick={closeDialog}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
          aria-label="Close"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Modal Header */}
        <h3 className="text-2xl font-bold mb-4 text-orange-600 text-center">Login</h3>

        {/* Login Form */}
        <form className="space-y-4">
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-md transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
