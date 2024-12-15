import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { z } from "zod";

export async function POST(req: Request) {
  const { fullName, email, password, height, weight, fitnessGoal } = await req.json();

  // Check if all fields are provided
  if (!fullName || !email || !password || !height || !weight || !fitnessGoal) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const finalheight = parseFloat(height);
  const finalweight = parseFloat(weight);

  // Check if the parsed values are valid numbers
  if (isNaN(finalheight) || isNaN(finalweight)) {
    return NextResponse.json({ message: 'Height and weight must be valid numbers' }, { status: 400 });
  }

  // Validate the input using Zod
  try {
    RegisterSchema.parse({ fullName, email, password, height: finalheight, weight: finalweight, fitnessGoal });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors.map((err) => err.message).join(", ") }, { status: 400 });
    }
    return NextResponse.json({ message: 'Validation failed', error: error.message }, { status: 500 });
  }

  try {
    await connectMongo();

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already registered' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      height,
      weight,
      fitnessGoal,
    });

    return NextResponse.json({ message: "User registered successfully.", user: newUser }, { status: 200 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
