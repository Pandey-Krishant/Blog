import { Postliststore } from "../Store/Postliststore";
import { useContext, useRef } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(Postliststore);

  const navigate = useNavigate();
  // useRef setup
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const dateElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault(); // Default form submit behavior ko roka

    // Values from refs
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const date = dateElement.current.value || new Date().toLocaleDateString(); // Default date if empty

    // Add post to context
    addPost(postTitle, postBody, date);

    // Clear form fields
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    dateElement.current.value = "";

    navigate("/");
  };

  return (
    <div
      className="
      bg-gradient-to-br from-purple-700 to-blue-800 // Form container ka gradient
      text-white 
      relative
      p-8 
      rounded-xl 
      shadow-2xl 
      max-w-lg // Form ko manageable size mein rakha
      mx-auto 
      my-3
      border border-purple-500/50 
    "
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide">
        ➕ Create New Post
      </h2>

      {/* ✅ FIX: onSubmit handler <form> tag par set kiya */}
      <form onSubmit={handleSubmit}> 
        
        {/* Title Input */}
        <div className="mb-5 ">
          <label
            htmlFor="title"
            className="block text-purple-200 font-semibold mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            ref={postTitleElement}
            id="title"
            placeholder="Enter a Post title..."
            className="w-full p-3 rounded-lg bg-blue-900/70 text-white border border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            required
          />
        </div>

        {/* Date Input */}
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block text-purple-200 font-semibold mb-2"
          >
            Date (e.g., Nov 18, 2025)
          </label>
          <input
            type="text"
            id="date"
            ref={dateElement}
            placeholder="Date of the post"
            className="w-full p-3 rounded-lg bg-blue-900/70 text-white border border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          />
        </div>


        {/* Description/Content Textarea */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-purple-200 font-semibold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            rows="6"
            ref={postBodyElement}
            placeholder="Write your amazing post content here..."
            className="w-full p-3 rounded-lg bg-blue-900/70 text-white border border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;