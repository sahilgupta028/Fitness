import mongoose, { Schema, Document, Model } from 'mongoose';

// Define TypeScript interface for the document
interface Exercise extends Document {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}

// Create the Mongoose schema
const ExerciseSchema: Schema = new Schema({
  bodyPart: { type: String, required: true },
  equipment: { type: String, required: true },
  gifUrl: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  target: { type: String, required: true },
  secondaryMuscles: { type: [String], required: true },
  instructions: { type: [String], required: true },
});

// Check if the model already exists, and use it if so
const ExerciseModel: Model<Exercise> = mongoose.models.Exercise || mongoose.model<Exercise>('Exercise', ExerciseSchema);

export default ExerciseModel;
