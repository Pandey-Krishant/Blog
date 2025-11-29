import React from 'react';
import { Link } from 'react-router-dom'; 
// ✅ Link import hua

const HomeIcon = () => <span className="text-xl">🏠</span>;
const PlusIcon = () => <span className="text-xl">➕</span>;

const Sidebar = ({ open, active, setActive }) => {
  return (
    <aside
      className={`
        bg-gradient-to-b from-purple-600 to-blue-600
        text-white
        h-screen
        p-5 flex flex-col
        shadow-2xl
        // 🛑 NOTE: 'absolute' use karne se Main Content overlap hoga.
        // Agar full-height sidebar chahiye, toh 'absolute' hata kar check karo.
        absolute
        
        flex
        flex-col
        curosr-none
        transition-all duration-300 
        ${open ? "w-1/4" : "w-0 overflow-hidden"}
      `}
    >
      {open && (
        <>
          {/* Sidebar Header/Logo */}
          <div className="text-3xl font-extrabold mb-8 tracking-wider border-b border-purple-400/50 pb-4">
            Dashboard
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3">

            {/* 1. Home Link (a tag ki jagah Link use karna better hai) */}
            <Link
              to="/" // 🎯 FIX: Home route generally '/' hota hai
              onClick={() => setActive('Home')}
              className={`
                flex items-center space-x-3 
                p-3 rounded-lg 
                text-2xl
                hover:bg-blue-700/50 
                transition duration-200 
                font-bold
                cursor-none
                ${
                  active === 'Home' 
                  ? 'bg-blue-700 shadow-lg border-l-4 border-white font-bold rounded-lg' 
                  : 'hover:bg-blue-700/50 rounded-lg'
                }`}
            >
              <HomeIcon />
              <span>Home</span>
            </Link>

            {/* 2. Create POS Link */}
            {/* ✅ FIX: <Link> component use kiya */}
            <Link
              to="/create-post" // 🎯 FIX: Create Post ka route path diya
               onClick={() => setActive('Create Post')}
              className={`
                flex items-center space-x-3 
                p-3 rounded-lg 
                text-2xl
                hover:bg-purple-700
                transition duration-200 
                font-bold
                cursor-none
                ${
                  active === 'Create Post' 
                  ? 'bg-blue-700 shadow-lg border-l-4 border-white font-bold rounded-lg' 
                  : 'hover:bg-blue-700/50 rounded-lg'
                }
              `}
            >
              <PlusIcon />
              <span>Create Post</span>
            </Link>
          </nav>
        </>
      )}
    </aside>
  );
};

export default Sidebar;