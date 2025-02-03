"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import { FaHeart, FaCommentAlt, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react";
import LoginRequired from "@/components/common/Login-required";

const socket = io("http://localhost:5000");

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    fetchPosts();
    socket.on("newPost", (post) => setPosts((prevPosts) => [post, ...prevPosts]));
    socket.on("updatePost", (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    });
    return () => socket.disconnect();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5000/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !postTitle.trim()) return;
    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: postTitle, content: newPost, author: session.user.fullName }),
    });
    setNewPost("");
    setPostTitle("");
    setShowForm(false);
  };

  const handleLike = async (postId) => {
    await fetch(`http://localhost:5000/posts/${postId}/like`, { method: "POST" });
  };

  const handleComment = async (postId, commentText) => {
    if (!commentText.trim()) return;
    await fetch(`http://localhost:5000/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: commentText, author: session.user.fullName }),
    });
  };

  const toggleComments = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === postId ? { ...post, showComments: !post.showComments } : post))
    );
  };

  if (!session) return <LoginRequired />;

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex flex-col items-center px-4">
      {/* New Post Button */}
      <motion.button
        onClick={() => setShowForm(!showForm)}
        className="mb-8 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus className="text-xl" /> New Post
      </motion.button>

      {/* Post Form */}
      {showForm && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.form
            onSubmit={handleSubmit}
            className="w-full sm:w-[500px] bg-white p-6 rounded-xl shadow-xl relative"
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
            >
              <AiOutlineClose size={20} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full p-3 border rounded mb-3"
            />
            <textarea
              placeholder="Share something..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-3 border rounded mb-3"
            />
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white p-3 rounded-md"
              whileTap={{ scale: 0.95 }}
            >
              Share
            </motion.button>
          </motion.form>
        </motion.div>
      )}

      {/* Posts */}
      <div className="w-full sm:w-[500px] space-y-6">
        {posts.map((post) => (
          <motion.div key={post._id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
          {/* Post Header */}
          <div className="flex items-center gap-3 mb-4">
            <Image src="/user.png" alt="Profile" width={40} height={40} className="rounded-full" />
            <p className="font-semibold text-gray-900">{post.author}</p>
          </div>
          {/* Post Content */}
          <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">{post.content}</p>
          {/* Post Actions */}
          <div className="flex justify-between items-center mt-4 border-t pt-3">
            <motion.button 
              onClick={() => handleLike(post._id)} 
              className="text-red-500 flex items-center gap-2 font-medium hover:text-red-600 transition"
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart className="text-xl" /> {post.likes}
            </motion.button>
            <motion.button 
              onClick={() => toggleComments(post._id)} 
              className="text-gray-600 flex items-center gap-2 font-medium hover:text-gray-800 transition"
              whileTap={{ scale: 0.9 }}
            >
              <FaCommentAlt className="text-xl" /> {post.comments.length}
            </motion.button>
          </div>
          {/* Comments Section */}
          {post.showComments && (
            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Comments</h3>
              <div className="space-y-2">
                {post.comments.map((comment, index) => (
                  <p key={index} className="text-sm text-gray-800 bg-white p-2 rounded-lg shadow-sm">
                    <strong className="text-gray-900">{comment.author}: </strong>{comment.text}
                  </p>
                ))}
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleComment(post._id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          )}
        </motion.div>
        ))}
      </div>
    </div>
  );
}
