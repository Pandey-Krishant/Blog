import React from 'react';
import { useContext } from "react";
import { Postliststore } from '../Store/Postliststore';
import Post2 from './Post2';

const Postlist = () => {
  const { postList } = useContext(Postliststore);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 w-full h-full position-relative"> 
      {/* Container added for better layout */}
      
      {postList.length === 0 && <p className="text-5xl font-bold text-white mt-10  flex-grow text-center my-[200px]">No posts yet! Create one 🤩.</p>}

      {postList.map((post) => (
        <Post2 key={post.id} post={post} /> 
      ))}
    </div>
  );
};

export default Postlist;