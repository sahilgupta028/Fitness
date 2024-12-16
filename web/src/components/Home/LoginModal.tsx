"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

interface LoginModalProps {
  closeDialog: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeDialog }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Call API to register the user
      const res = await fetch("/api/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
      });
  
      const data = await res.json();

      console.log(data);
  
      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }
  
      toast.success("Logging you in...");
  
      // Automatically log the user in using NextAuth
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
  
      if (loginResult?.error) {
        toast.error("Failed to log in");
      } else {
        toast.success("Logged in successfully!");
        closeDialog();
        // Redirect to the profile page
        // router.push("/profile");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster />
      <div className="bg-white text-gray-900 p-8 rounded-lg w-96 max-w-md shadow-lg relative">
        {/* Close Button */}
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
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          {/* Password Field */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
