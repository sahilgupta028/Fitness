import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  content: String,
  author: String,
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
});

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default PostModel;
