import mongoose, { Schema } from "mongoose";

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
  },
  { timestamps: true }
);

// Create the User model
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
