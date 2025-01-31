/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
import path from "path";
import axios from "axios";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"

// File path for the exercise data (if needed)
// const EXERCISE_FILE_PATH = path.join(process.cwd(), "exercise_list.txt"); // Adjust path based on file location

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req: Request) {
    const { age, weight, height, goal } = await req.json();

    console.log({ age, weight, height, goal });

    if (!age || !weight || !height || !goal) {
        return NextResponse.json({ message: 'Validation failed' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

    try {
        // Prepare the prompt for Gemini AI based on user details
        const prompt = `
            Given a person with the following details:
            - Age: ${age}
            - Weight: ${weight} kg
            - Height: ${height} cm
            - Goal: ${goal}

            Give 5 best exercise names. write this in array format given below:
            [ "Exercise 1", "Exercise 2", ... ] 
        `;

        const model = genAI.getGenerativeModel({
            model: "gemini-pro"
        });

        const result = await model.generateContent(prompt);
        console.log(result.response.candidates[0].content.parts);
        const response = result.response.candidates[0].content.parts; // Get the first candidate's content

        // Parse the response from Gemini and return it
        const recommendedExercises = response;

        console.log(recommendedExercises);

        return NextResponse.json({ exercise: recommendedExercises }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: 'Validation failed', error: err }, { status: 500 });
    }
}