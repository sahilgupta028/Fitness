"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { SiTicktick } from "react-icons/si";

interface RegisterModalProps {
  closeDialog: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ closeDialog }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    height: "",
    weight: "",
    fitnessGoal: "",
    otp: "", // For OTP
  });

  const [isOTPSent, setIsOTPSent] = useState(false); // Track OTP status
  const [isOTPVerified, setIsOTPVerified] = useState(false); // Track OTP verification

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      toast.error("Please enter your email to receive OTP.");
      return;
    }

    toast.loading("Sending OTP...");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP.");

      toast.dismiss();

      toast.success("OTP sent successfully!");
      setIsOTPSent(true);
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed.");

      toast.success("OTP verified successfully!");
      setIsOTPVerified(true);
    } catch (error) {
      console.error(error);
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isOTPVerified) {
      toast.error("Please verify your email first.");
      return;
    }

    try {
      const res = await fetch("/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful! Logging you in...");
      const loginResult = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (loginResult?.error) {
        toast.error("Failed to log in after registration");
      } else {
        toast.success("Logged in successfully!");
        closeDialog();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster />
      <div className="bg-white text-gray-900 p-8 rounded-lg w-96 max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-orange-600">Register Now</h3>
          <IoClose
            onClick={closeDialog}
            className="text-gray-600 text-2xl cursor-pointer hover:text-red-500"
          />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
          />
          {/* Email and Send OTP in One Line */}
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
              disabled={isOTPVerified || isOTPSent}
            />
            {!isOTPSent ? (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={isOTPSent}
                className={`p-3 bg-orange-600 text-white rounded-md hover:bg-orange-500 whitespace-nowrap`}
              >
                {isOTPSent ? "" : "Send OTP"}
              </button>
            ) : (
              <SiTicktick className="text-green-600 h-6 w-6 font-extrabold" />
            )}
          </div>
          {/* OTP Input */}
          {isOTPSent && !isOTPVerified && (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => handleInputChange("otp", e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
              />
              <button
                type="button"
                onClick={handleVerifyOTP}
                className="p-3 bg-green-600 text-white rounded-md hover:bg-green-500 whitespace-nowrap"
              >
                Verify OTP
              </button>
            </div>
          )}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="number"
            placeholder="Height (in cm)"
            value={formData.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="number"
            placeholder="Weight (in kg)"
            value={formData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
          />
          <select
            value={formData.fitnessGoal}
            onChange={(e) => handleInputChange("fitnessGoal", e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
          >
            <option value="">Select Your Fitness Goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
