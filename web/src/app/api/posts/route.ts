import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import PostModel from "@/models/Post";

export async function GET() {
  await connectMongo();
  const posts = await PostModel.find().populate("comments");
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await connectMongo();
  const { content, author } = await req.json();

  const newPost = await PostModel.create({ content, author, likes: 0, comments: [] });
  return NextResponse.json(newPost);
}
