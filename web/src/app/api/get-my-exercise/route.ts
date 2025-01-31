/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";
import ExerciseModel from "@/models/Excercise";
import connectMongo from "@/lib/mongodb";
// import moment from "moment";

export async function GET(req: NextApiRequest) {
  await connectMongo();

  console.log(req.url);

  // Extract the `id` query parameter
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const id = url.searchParams.get("id");

  console.log(id);

  if (!id) {
    return NextResponse.json({ message: 'Id is required' }, { status: 400 });
  }

  try {
    // Fetch the user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log(user.exercises);

    // const today = moment().format("DD-MM-YYYY");

    // // Filter exercises logged today
    // const todayExercises = user.exercises.filter(
    //   (exercise: any) => exercise.date == today
    // );

    // console.log(today);
    // console.log(todayExercises);

    // Fetch detailed exercise data from the `Exercise` model
    const detailedExercises = await Promise.all(
      user.exercises.map(async (exercise: { name: any; date: string; timer: number; }) => {
        const details = await ExerciseModel.findOne({ name: exercise.name });
        return {
          ...details.toObject(), // Convert Mongoose document to plain object
          date: exercise.date,
          timer: exercise.timer,
        };
      })
    );
    
    console.log(detailedExercises);

    // Respond with the detailed exercise data
    return NextResponse.json({ 
      message: "Today's exercises fetched successfully.", 
      exercises: detailedExercises 
    }, { status: 200 });
  } catch (err) {
    console.error("Error fetching today's exercises:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
