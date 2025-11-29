import React from 'react'



const Header = ({ toggle }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg p-4 flex items-center justify-between fixed-top cursor-none ">
      <svg
        onClick={toggle}
        style={{ cursor: "none", fontSize: "30px" }}
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8" // Size control
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      
      <div className="text-3xl font-bold ">Krishant's Post ✒️</div>
        
      {/* Right Side: Navigation Links */}
      <nav className="space-x-6 text-lg">
        {/* Navigation Links */}
        <a
          href="#home"
          className="hover:text-purple-200 transition duration-300 hover:underline text-2xl font-bold tracking-wider"
        >
          Home
        </a>
        <a
          href="#about"
          className="hover:text-purple-200 transition duration-300 hover:underline text-2xl font-bold tracking-wider"
        >
          About
        </a>
        <a
          href="#contact"
          className="hover:text-purple-200 transition duration-300 hover:underline text-2xl font-bold tracking-wider"
        >
          Contact 📞
        </a>

        {/* Login Button */}
        <button className="bg-white text-blue-600 px-4 py-1 rounded-full hover:bg-gray-100 transition duration-300 font-semibold hover:underline text-2xl font-bold tracking-wider">
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
