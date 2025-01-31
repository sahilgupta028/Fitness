"use client";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import { FaDumbbell, FaHeart, FaCommentAlt, FaPlus } from "react-icons/fa";
import Image from "next/image";  // For optimized images
import Link from "next/link";  // To optimize routing
import { AiOutlineClose } from "react-icons/ai";
import { useSession } from "next-auth/react";
import LoginRequired from "@/components/common/Login-required";

const socket = io("http://localhost:5000");

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchPosts();

    socket.on("newPost", (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

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
      body: JSON.stringify({ title: postTitle, content: newPost }),
    });
    setNewPost("");
    setPostTitle("");
    setShowForm(false); // Close the form after submission
  };

  const handleLike = async (postId) => {
    await fetch(`http://localhost:5000/posts/${postId}/like`, { method: "POST" });
  };

  const handleComment = async (postId, commentText) => {
    if (!commentText.trim()) return;
    await fetch(`http://localhost:5000/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: commentText }),
    });
  };

  const toggleComments = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  if (!session) return <LoginRequired />;

  return (
    <div className="min-h-screen bg-white py-12 flex flex-col items-center px-4">
      {/* Toggle Form Button */}
      <motion.button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-8 bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-orange-700 transition-all duration-300 flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus className="text-xl" /> New Post
      </motion.button>

      {/* Post Input Section */}
      {showForm && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                {/* Close Button */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full sm:w-[700px] relative bg-white p-8 rounded-lg shadow-xl border-2 border-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
                  onClick={() => setShowForm((prev) => !prev)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                  aria-label="Close"
                >
                  <AiOutlineClose size={20} />
                </button>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Share Your Fitness Journey</h2>
          <input
            type="text"
            placeholder="Post Title (e.g., 'Workout of the Day')"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all mb-4"
            aria-label="Post Title"
          />
          <textarea
            placeholder="Share your fitness tip, workout, or progress..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all mb-6"
            rows="6"
            aria-label="Post Content"
          />
          <motion.button
            type="submit"
            className="w-full bg-orange-600 text-white p-3 rounded-md font-semibold hover:bg-orange-700 transition-all"
            whileTap={{ scale: 0.95 }}
            aria-label="Submit Post"
          >
            Share
          </motion.button>
        </motion.form>
        </motion.div>
      )}

      {/* Posts Section */}
      <div className="w-full sm:w-[700px] space-y-8">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            className="bg-white p-4 rounded-lg shadow-xl border-2 border-gray-200 hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label={`Post titled ${post.title}`}
          >
            <h2 className="text-xl font-bold text-blue-600 underline">{post.title}</h2>
            <p className="text-lg text-gray-800 mt-2">{post.content}</p>

            {/* Like & Comment Buttons */}
            <div className="flex items-center justify-between mt-6">
              <motion.button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-3 text-orange-600 font-semibold hover:text-orange-700 transition-all"
                whileTap={{ scale: 0.9 }}
                aria-label="Like Post"
              >
                <FaHeart className="text-xl" /> {post.likes}
              </motion.button>

              <motion.button
                onClick={() => toggleComments(post._id)} // Toggle comments visibility
                className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-all"
                whileTap={{ scale: 0.9 }}
                aria-label="View Comments"
              >
                <FaCommentAlt className="text-xl" /> {post.comments.length}
              </motion.button>
            </div>

            {/* Comments Section */}
            {post.showComments && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-gray-700">💬 Comments</h3>
                <div className="space-y-3 mt-3">
                  {post.comments.map((comment, index) => (
                    <motion.p
                      key={index}
                      className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {comment.text}
                    </motion.p>
                  ))}
                </div>

                {/* Add Comment Input */}
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full p-3 border-2 border-gray-300 rounded-md mt-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleComment(post._id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                  aria-label="Add a Comment"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
