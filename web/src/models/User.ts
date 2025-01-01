import mongoose, { Schema } from "mongoose";

// Define the Exercise sub-schema
const ExerciseSchema: Schema = new Schema(
  {
    name: { type: String, required: true }, // Exercise name
    bodyPart: { type: String, required: true }, // Body part
    timer: { type: Number, required: true }, // Duration in seconds
    date: { type: String, required: true }, // Date in DD-MM-YYYY format
  },
  { _id: false } // Prevent MongoDB from creating a unique _id for each exercise
);

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    fitnessGoal: {
      type: String,
      enum: ["weight_loss", "muscle_gain", "maintenance"],
      required: true,
    },
    exercises: [ExerciseSchema], // Array of exercises
  },
  { timestamps: true }
);

// Create the User model
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
