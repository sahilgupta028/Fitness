import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import PostModel from "@/models/Post";

export async function POST(req: Request) {
  await connectMongo();
  const { postId, comment, author } = await req.json();

  const post = await PostModel.findById(postId);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  post.comments.push({ comment, author });
  await post.save();

  return NextResponse.json(post);
}
