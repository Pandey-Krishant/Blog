import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// --- Shared UI Components (Pure Components) ---

const GradientButton = ({ children, type = "button" }) => (
    <button 
        type={type} 
        className="p-4 mt-6 rounded-lg font-extrabold text-xl tracking-wider transition duration-300 transform hover:scale-[1.01] relative z-10 w-full"
        style={{
            background: 'linear-gradient(90deg, #a855f7, #3b82f6)', 
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 10px rgba(59, 130, 246, 0.5)',
            color: 'white' 
        }}
    >
        {children}
    </button>
);

const GlowingInput = ({ name, type, placeholder }) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="w-full p-3 rounded-md border border-purple-500/50 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 text-base font-medium"
        style={{ textShadow: '0 0 3px rgba(59, 130, 246, 0.5)' }}
    />
);

const FormContainer = ({ children }) => (
    <div 
        className="bg-white/5 backdrop-blur-lg p-10 rounded-2xl w-full max-w-lg text-center border border-purple-500/30 relative shadow-2xl transition-opacity duration-500"
        style={{
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(59, 130, 246, 0.3)',
            transform: 'translateZ(0)',
        }}
    >
        {children}
    </div>
);


// --- Component 1: Register Form ---
// ✅ FIX: setIsLoggedIn prop added
const RegisterCard = ({ switchForm, navigate, setIsLoggedIn }) => { 
    
    const handleRegister = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstname.value;
        const lastName = e.target.lastname.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        console.log("Attempting Register:", { firstName, lastName, email });

        try {
            const response = await axios.post("http://localhost:3000/api/auth/user/register", {
                username: firstName + " " + lastName,
                email,
                password
            },
            {
                withCredentials: true
            })

            console.log("Registration Successful:", response.data);

            // 💥 MAIN FIX: Login successful hone par state change karo
            setIsLoggedIn(true); 
            
            // Ab navigate hoga to home page
            navigate("/create-post") 
            
        } catch (error) {
            console.error("Registration Failed (Error):", error.response ? error.response.data : error.message);
        }
    };

    return (
        <FormContainer>
            <h1 
                className="text-4xl font-extrabold mb-2 tracking-wide text-white select-none"
                style={{ textShadow: '0 0 15px #a855f7, 0 0 10px #3b82f6' }}
            >
                CREATE ACCOUNT
            </h1>
            <p className="text-lg text-gray-300 mb-10 font-light">Your Journey Starts Here</p>
            
            <form onSubmit={handleRegister} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-2 gap-3"> 
                    <GlowingInput type="text" name="firstname" placeholder="FIRSTNAME"/>
                    <GlowingInput type="text" name="lastname" placeholder="LASTNAME"/>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <GlowingInput type="email" name="email" placeholder="EMAIL"/>
                    <GlowingInput type="password" name="password" placeholder="PASSWORD"/>
                </div>
                
                <GradientButton type="submit"> 
                    REGISTER
                </GradientButton>
                
            </form>

            <div className="mt-8 text-gray-400 text-base font-light">
                Already have an Account? 
                <button 
                    onClick={() => switchForm(true)} 
                    className="text-blue-400 font-semibold hover:text-purple-400 transition duration-300 ml-2 focus:outline-none"
                    style={{ textShadow: '0 0 5px rgba(59, 130, 246, 0.5)' }}
                > 
                    Login Here
                </button>
            </div>
        </FormContainer>
    );
};


// --- Component 2: Login Form ---
// ✅ FIX: setIsLoggedIn prop added
const LoginCard = ({ switchForm, navigate, setIsLoggedIn }) => { 
    
    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log("Attempting Login:", { email });
        
        try {
            const response = await axios.post("http://localhost:3000/api/auth/user/login", {
                email,
                password
            }, { withCredentials: true });

            console.log("Login Successful:", response.data);

            // 💥 MAIN FIX: Login successful hone par state change karo
            setIsLoggedIn(true); 

            // Ab navigate hoga to home page
            navigate("/create-post"); 
            
        } catch (error) {
            console.error("Login Failed (Error):", error.response ? error.response.data : error.message);
        }
    };

    return (
        <FormContainer>
            <h1 
                className="text-4xl font-extrabold mb-2 tracking-wide text-white select-none"
                style={{ textShadow: '0 0 15px #a855f7, 0 0 10px #3b82f6' }}
            >
                WELCOME BACK
            </h1>
            <p className="text-lg text-gray-300 mb-10 font-light">Access Your Blogs</p>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
                
                <GlowingInput type="text" name="email" placeholder="USERNAME / EMAIL"/>
                <GlowingInput type="password" name="password" placeholder="PASSWORD"/>
                
                <GradientButton type="submit"> 
                    LOG IN
                </GradientButton>
                
            </form>

            <div className="mt-8 text-gray-400 text-base font-light">
                New User? 
                <button 
                    onClick={() => switchForm(false)} 
                    className="text-blue-400 font-semibold hover:text-purple-400 transition duration-300 ml-2 focus:outline-none"
                    style={{ textShadow: '0 0 5px rgba(59, 130, 246, 0.5)' }}
                > 
                    Create An Account
                </button>
            </div>
        </FormContainer>
    );
};


// --- Main Application Component (The Switcher) ---
// ✅ FIX: setIsLoggedIn prop added
const Card = ({ setIsLoggedIn }) => {
    const [isLogin, setIsLogin] = useState(false); 
    const navigate = useNavigate();
    
    const switchForm = (toLogin) => {
        setIsLogin(toLogin);
    };

    const layoutClasses = "min-h-screen flex items-center justify-center p-4 font-inter relative overflow-hidden";
    
    const backgroundImageStyle = {
        backgroundImage: 'url("/bg.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#111827', 
    };


    return (
        <div 
            className={layoutClasses} 
            style={backgroundImageStyle} 
        >
            
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
            
            <div className="w-full max-w-sm sm:max-w-lg z-10">
                <div key={isLogin ? 'login' : 'register'} className="transition duration-500 ease-in-out">
                    {isLogin ? (
                        // ✅ FIX: setIsLoggedIn prop pass kiya
                        <LoginCard switchForm={switchForm} navigate={navigate} setIsLoggedIn={setIsLoggedIn} />
                    ) : (
                        // ✅ FIX: setIsLoggedIn prop pass kiya
                        <RegisterCard switchForm={switchForm} navigate={navigate} setIsLoggedIn={setIsLoggedIn} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;