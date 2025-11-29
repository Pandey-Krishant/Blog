import React from 'react';
import { Postliststore } from '../Store/Postliststore';
import { Link } from 'react-router-dom'
import { useContext } from 'react';

const Post2 = ({ post }) => {
  const { deletePost } = useContext(Postliststore);
  

  return (
    <div className="
      bg-gradient-to-br from-purple-700 to-blue-800 // Post Card ka gradient
      text-white 
      p-6 
      rounded-xl 
      shadow-xl 
      max-w-md 
      my-4 
      border border-purple-500/50 
    ">
      
      {/* Delete button (positioned absolutely for better UI) */}
      {/* <button 
          onClick={() => deletePost(post.id)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-1 rounded-full leading-none transition duration-200 focus:outline-none text-sm"
      >
          ❌
      </button> */}

      {/* Post Title */}
      <h2 className="text-3xl font-extrabold mb-3 leading-tight">
        {post.title}
      </h2>
      
      {/* Author & Date */}
      <p className="text-purple-200 text-sm mb-4">
        By {post.userId || "Unknown Author"} on {post.date || "N/A"} 
        {/* ✅ FIX: post.userId used */}
      </p>

      {/* Post Description */}
      <p className="text-blue-100 mb-6 leading-relaxed">
        {post.body}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 border-t border-purple-500/30 pt-4">
        <Link
        oto={`/edit/${post.id}`}
          className="
            bg-purple-500 hover:bg-purple-600 
            text-white font-semibold 
            py-2 px-5 rounded-lg 
            transition duration-200 
          "
        >
          Edit Post
        </Link>
        <button 
          onClick={() => deletePost(post.id)}
          className="
            bg-red-500 hover:bg-red-600 
            text-white font-semibold 
            py-2 px-5 rounded-lg 
            transition duration-200 
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post2;