"use client";
import { useState } from "react";
import RegisterModal from "./RegisterModal"; // Assuming you will create the dialog component separately
import LoginModal from "./LoginModal";

export default function Banner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const openRegisterDialog = () => {
    setIsOpen(true);
  };

  const closeRegisterDialog = () => {
    setIsOpen(false);
  };

  const openLoginDialog = () => {
    setIsLogin(true);
  };

  const closeLoginDialog = () => {
    setIsLogin(false);
  };

  return (
    <section className="relative bg-white text-gray-900 my-10 max-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left side content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-orange-600 leading-tight">
            Transform Your Fitness Journey Today!
          </h2>
          <p className="text-lg text-gray-700 max-w-lg mx-auto md:mx-0">
            Join our community and access personalized fitness plans, expert guidance, and a wide range of health resources.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
          <button
            onClick={openRegisterDialog}
            className="bg-orange-600 hover:bg-orange-500 text-white py-3 px-8 rounded-md text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
          <button
            onClick={openLoginDialog}
            className="bg-orange-600 hover:bg-orange-500 text-white py-3 px-8 rounded-md text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sign-in
          </button>
          </div>
        </div>

        {/* Right side image */}
        <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
          <img
            src="/fit.jpg" // Replace with the path to your image
            alt="Fitness Image"
            className="w-full h-auto object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Register Dialog (Pop-up) */}
      {isOpen && <RegisterModal closeDialog={closeRegisterDialog} />}

      {isLogin && <LoginModal closeDialog={closeLoginDialog} />}
    </section>
  );
}
