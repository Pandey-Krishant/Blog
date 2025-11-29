import { useState,useEffect } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import PostliststoreProvider from "./Store/Postliststore";
import Footer from "./Components/Footer";
import { Outlet,useLocation } from "react-router-dom"; 
import "./app.css";
import Animation from "./Components/Animation";

// Import Login Component (The Card)
import Card from "./Components/Login"; 


function App() {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("Home");

  // 💥 MAIN FIX: State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActive("Home");
    } else if (location.pathname === "/create-post") {
      setActive("Create Post");
    } else if (location.pathname.startsWith("/edit/")) { 
      setActive("Create Post"); 
    } 
  }, [location.pathname]);

  return (
    <PostliststoreProvider>
      <Animation/>
      
      {/* 💥 CONDITIONAL RENDERING: Check if user is logged in */}
      {isLoggedIn ? (
          // --- Main Application Layout (If Logged In) ---
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-800 to-blue-900 text-white cursor-none">
              <Header toggle={() => setOpen(!open)} />

              <div className="flex flex-1">
                  <Sidebar open={open} active={active} setActive={setActive} />

                  <main
                      className={`flex-1 p-6 ${
                          open ? "ml-[25%]" : "ml-0"
                      } transition-all duration-300`}
                  >
                      <Outlet /> 
                  </main>
              </div>
              
              <Footer />
          </div>
      ) : (
          // --- Login/Register Card (If Logged Out) ---
          // ✅ FIX: setIsLoggedIn function ko Card component mein pass kiya
          <Card setIsLoggedIn={setIsLoggedIn} /> 
      )}
      
    </PostliststoreProvider>
  );
}

export default App;