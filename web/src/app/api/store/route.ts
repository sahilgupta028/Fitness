/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Store from '@/models/Store';

export async function GET(req: NextRequest) {
  console.log("Started");

  connectMongo();

  try {
    const stores = await Store.find();
    return NextResponse.json(stores, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}