import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "@/store/registerSlice"; // Update path accordingly
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

interface RegisterModalProps {
  closeDialog: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ closeDialog }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state: object) => state.register);

  const handleInputChange = (field: string, value: string) => {
    dispatch(updateField({ field, value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    // Validate the form data using zod schema
    try {
      console.log("Loading");

      // RegisterSchema.parse(formData);
      
      console.log("done");

      // If validation passes, make the API call
      const response = await fetch("/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      const result = await response.json();
      console.log(result.message);

      toast.success(result.message);

      dispatch(resetForm());
      closeDialog();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod validation errors
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        console.error("An error occurred:", error);
        alert("Failed to register. Please try again later.");
      }
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="number"
            placeholder="Height (in cm)"
            value={formData.height}
            onChange={(e) => handleInputChange("height", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="number"
            placeholder="Weight (in kg)"
            value={formData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <select
            value={formData.fitnessGoal}
            onChange={(e) => handleInputChange("fitnessGoal", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            <option value="">Select Your Fitness Goal</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
          </select>
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
