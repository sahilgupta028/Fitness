const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Update if your frontend URL is different
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Post Schema
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String, createdAt: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", PostSchema);

// API Routes
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  console.log({ title, content });
  const newPost = new Post({ title, content });
  await newPost.save();
  io.emit("newPost", newPost); // Real-time update
  res.status(201).json(newPost);
});

app.post("/posts/:id/like", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  if (!post) return res.status(404).json({ message: "Post not found" });

  io.emit("updatePost", post); // Real-time update
  res.json(post);
});

app.post("/posts/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const post = await Post.findByIdAndUpdate(
    id, 
    { $push: { comments: { text } } }, 
    { new: true }
  );
  if (!post) return res.status(404).json({ message: "Post not found" });

  io.emit("updatePost", post); // Real-time update
  res.json(post);
});

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => console.log("User disconnected"));
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));