import { Postliststore } from "../Store/Postliststore";
import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ useParams and useNavigate
import React from 'react';

const EditPost = () => {
  const { postList, editPost } = useContext(Postliststore);
  const navigate = useNavigate();
  
  // URL se post ID nikalne ke liye
  const { postId } = useParams(); 
  
  // Find the post to edit
  const postToEdit = postList.find(post => post.id === postId);

  // Agar post nahi mila, toh handle karo
  if (!postToEdit) {
    return <p className="text-3xl text-red-400 text-center mt-10">Post not found!</p>;
  }

  // Refs for form handling
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const dateElement = useRef();

  // 🎯 useEffect to pre-fill the form fields
  useEffect(() => {
    if (postToEdit) {
      postTitleElement.current.value = postToEdit.title;
      postBodyElement.current.value = postToEdit.body;
      dateElement.current.value = postToEdit.date || '';
    }
  }, [postToEdit]);


  const handleEditSubmit = (event) => {
    event.preventDefault(); 

    const editedPost = {
      id: postToEdit.id, // Original ID same rahega
      title: postTitleElement.current.value,
      body: postBodyElement.current.value,
      date: dateElement.current.value,
      userId: postToEdit.userId, // Original User ID same rahega
    };

    // 1. Edit post to context
    editPost(editedPost);

    // 2. Redirect to Home Page
    navigate("/"); 
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-blue-800 text-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto my-3 border border-purple-500/50">
      <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide">
        ✍️ Edit Post: {postToEdit.title}
      </h2>
      
      <form onSubmit={handleEditSubmit}> 
        {/* Title Input */}
        <div className="mb-5 ">
          <label htmlFor="title" className="block text-purple-200 font-semibold mb-2">Post Title</label>
          <input type="text" ref={postTitleElement} id="title" className="w-full p-3 rounded-lg bg-blue-900/70 text-white border border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200" required/>
        </div>

        {/* Date Input */}
        <div className="mb-5">
          <label htmlFor="date" className="block text-purple-200 font-semibold mb-2">Date</label>
          <input type="text" id="date" ref={dateElement} className="w-full p-3 rounded-lg bg-blue-900/70 text-white border border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"/>
        </div>

        {/* Description/Content Textarea */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-purple-200 font-semibold mb-2">Content</label>
          <textarea id="content" rows="6" ref={postBodyElement} className="w-full p-3 rounded-lg bg-blue-900/70 text-white border border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200" required></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-lg transition duration-300 shadow-md hover:shadow-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;