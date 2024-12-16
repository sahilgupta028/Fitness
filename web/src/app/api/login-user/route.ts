import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectMongo();

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
