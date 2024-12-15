/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '@/lib/mongodb';
import ExerciseModel from '@/models/Excercise';

// Fetch students by classGroup
export async function GET(req: NextRequest) {

    console.log("start");
    
    connectMongo();

    console.log("Connected");

  try {
    const excercise = await ExerciseModel.find();
    return NextResponse.json(excercise, { status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}