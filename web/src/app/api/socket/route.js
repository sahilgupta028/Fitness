// pages/api/socket.js
import { Server } from 'socket.io';

let posts = [];

const socketHandler = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Socket API route' });
    return;
  }
  res.status(405).json({ message: 'Only GET requests are allowed' });
};

export const io = new Server(res.socket.server, {
  path: '/api/socket',
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit existing posts to the client upon connection
  socket.emit('existingPosts', posts);

  // Handle creating new post
  socket.on('createPost', (newPost) => {
    console.log('New post received:', newPost);
    posts.push(newPost);
    io.emit('newPost', newPost); // Emit new post to all clients
  });

  // Handle liking a post
  socket.on('likePost', (postId) => {
    console.log('Post liked:', postId);
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.likes += 1;
      io.emit('postLiked', post); // Emit updated post to all clients
    }
  });

  // Handle adding a comment
  socket.on('commentPost', (commentData) => {
    console.log('New comment received:', commentData);
    const post = posts.find((p) => p.id === commentData.postId);
    if (post) {
      post.comments.push(commentData.comment);
      io.emit('newComment', post); // Emit updated post to all clients
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

export default socketHandler;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
