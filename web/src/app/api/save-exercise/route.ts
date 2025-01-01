
import connectMongo from "@/lib/mongodb";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectMongo();

  console.log("Backend Started...");

  const { id, duration, date, exerciseName, bodyPart } = await req.json();

  console.log(id, duration, date, exerciseName, bodyPart);

  if (!id || !exerciseName || !bodyPart || !duration || !date) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    // Find the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create the exercise object
    const newExercise = {
      name: exerciseName,
      bodyPart,
      timer: duration,
      date,
    };

    // Push the exercise to the user's exercises array
    user.exercises.push(newExercise);
    await user.save();

    return NextResponse.json({ message: "Exercise added successfully.", exercise: newExercise }, { status: 200 });
  } catch (err) {
    console.error("Error saving exercise:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
