import React, { useState } from 'react';
import { X } from 'lucide-react';
import About from '../components/About';
import Contact from '../components/Contact.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../assets/landingPage.jpg'
import "../styles/index.css";


const Navigation = ({ onLoginClick }) => (
    <nav className="fixed w-full backdrop-blur-md bg-white/10 shadow-lg z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center relative">
            <h1 className="text-2xl font-bold text-gray-100 drop-shadow-lg">
                BookExchange
            </h1>

            <div className="absolute right-4 sm:right-6 lg:right-8">
                <button
                    onClick={onLoginClick}
                    className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Login
                </button>
            </div>
        </div>
    </nav>
);

const Hero = () => (
    <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
        style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0, 128, 128, 0.3)), url(${bgImage})`
        }}
    >
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>

        <div className="relative w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Hero Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h1 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text 
                        bg-gradient-to-r from-white via-emerald-100 to-white 
                        mb-6 drop-shadow-lg leading-tight">
                    BookExchange
                </h1>
                <p className="text-xl lg:text-3xl text-emerald-100 mb-4 drop-shadow-md 
                       font-medium tracking-wide">
                    Give your book countless lives
                </p>
                <p className="text-lg lg:text-xl text-gray-300 drop-shadow-md 
                       leading-relaxed max-w-2xl">
                    Exchange any book with any book here and pay only for shipping.
                </p>
            </div>

            {/* Hero Card */}
            <div className="w-full lg:w-1/2 max-w-xl">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl 
                        border border-white/10 p-8 lg:p-12
                        shadow-2xl hover:shadow-emerald-500/10 
                        transition-all duration-500 hover:bg-white/10
                        transform hover:scale-[1.02]">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                        Start Exchanging Today
                    </h2>
                    <p className="text-white/80 mb-8">
                        Join our community of book lovers and start sharing your literary treasures.
                    </p>
                    <button className="w-full py-4 rounded-lg bg-emerald-500/50 
                             hover:bg-emerald-500/70 text-white font-semibold 
                             transition-all duration-300 border border-emerald-400/30
                             transform hover:translate-y-[-2px]">
                        Get Started
                    </button>
                </div>
            </div>
        </div>

        {/* Decorative Elements */}
        <div className="hidden lg:block absolute -bottom-10 left-0 right-0 h-32 
                    bg-gradient-to-b from-transparent to-gray-900/90"></div>
        <div className="hidden lg:block absolute top-1/4 left-1/4 w-72 h-72 
                    bg-emerald-500/30 rounded-full blur-3xl"></div>
        <div className="hidden lg:block absolute bottom-1/4 right-1/4 w-96 h-96 
                    bg-blue-500/20 rounded-full blur-3xl"></div>
    </section>
);

const AuthModal = ({ isOpen, onClose, activeTab, onTabChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:3001/auth/signin", {
                email: formData.email,
                password: formData.password,
            });

            const { user } = response.data;
            console.log(response.data);

            localStorage.setItem('username', user.username);
            localStorage.setItem('id', user._id);
            localStorage.setItem("authToken", response.data.token);

            console.log("This is step");

            onClose();
            // Instead of using navigate, we can use window.location
            // Navigate to the protected or main page
            navigate('/home', { state: { userId: user._id } });
            console.log("state of userid also sent");

        } catch (error) {
            console.error(error);
            console.log("This is the error triggered at frontend")
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };


    const handleForgotPassword = () => {
        // Navigate to forgot password page or open modal
        // Example:
        navigate('/forgetPassword');
        // or
        // setForgotPasswordModalOpen(true);
    }; 

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post("http://localhost:3001/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            setFormData({
                username: '',
                email: '',
                password: ''
            });

            onTabChange('login');
            setError('Registration successful! Please login.');
        } catch (error) {
            console.error(error);
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xl bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-2xl blur">
                </div>

                <div className="relative bg-gray-900/50 backdrop-blur-2xl rounded-2xl p-6 lg:p-8 
                        border border-white/10 shadow-2xl">
                    <div className="fixed inset-0 backdrop-blur-lg bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md mx-4 border border-white/20 shadow-2xl">
                            {error && (
                                <div className="mb-4 p-3 bg-red-500/10 backdrop-blur-md text-red-100 rounded-lg border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-8">
                                <div className="flex space-x-6">
                                    <button
                                        onClick={() => onTabChange('login')}
                                        className={`text-lg font-semibold pb-2 transition-all duration-300 ${activeTab === 'login'
                                            ? 'border-b-2 border-emerald-400 text-white'
                                            : 'text-gray-400 hover:text-gray-200'
                                            }`}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => onTabChange('signup')}
                                        className={`text-lg font-semibold pb-2 transition-all duration-300 ${activeTab === 'signup'
                                            ? 'border-b-2 border-emerald-400 text-white'
                                            : 'text-gray-400 hover:text-gray-200'
                                            }`}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-300">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {activeTab === 'login' ? (
                                <form className="space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <label className="block text-gray-200 mb-2" htmlFor="login-email">Email</label>
                                        <input
                                            type="email"
                                            id="login-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 text-white placeholder-gray-400 backdrop-blur-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-gray-200" htmlFor="login-password">
                                                Password
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => handleForgotPassword()} // Add this function to handle forgot password
                                                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors 
                         duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 
                         rounded px-2 py-1 -mr-2"
                                            >
                                                Forgot Password?
                                            </button>
                                        </div>
                                        <input
                                            type="password"
                                            id="login-password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 
                     focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                     focus:ring-emerald-400/20 text-white placeholder-gray-400 backdrop-blur-md"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-2 rounded-lg backdrop-blur-md transition-all duration-300 ${isLoading
                                            ? 'bg-emerald-500/30 cursor-not-allowed'
                                            : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                                            } text-white font-semibold shadow-lg hover:shadow-emerald-500/20`}
                                    >
                                        {isLoading ? 'Logging in...' : 'Login'}
                                    </button>

                                </form>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSignup}>
                                    <div>
                                        <label className="block text-gray-200 mb-2" htmlFor="signup-name">Full Name</label>
                                        <input
                                            type="text"
                                            id="signup-name"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 text-white placeholder-gray-400 backdrop-blur-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-200 mb-2" htmlFor="signup-email">Email</label>
                                        <input
                                            type="email"
                                            id="signup-email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 text-white placeholder-gray-400 backdrop-blur-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-200 mb-2" htmlFor="signup-password">Password</label>
                                        <input
                                            type="password"
                                            id="signup-password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 text-white placeholder-gray-400 backdrop-blur-md"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`w-full py-2 rounded-lg backdrop-blur-md transition-all duration-300 ${isLoading
                                            ? 'bg-emerald-500/30 cursor-not-allowed'
                                            : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                                            } text-white font-semibold shadow-lg hover:shadow-emerald-500/20`}
                                    >
                                        {isLoading ? 'Signing up...' : 'Sign Up'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};




const IntroPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 
                      relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 
                        rounded-full blur-3xl hidden lg:block"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 
                        rounded-full blur-3xl hidden lg:block"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <Navigation onLoginClick={() => setIsModalOpen(true)} />
                <Hero />
                <About />
                <Contact />
                <AuthModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>
        </div>
    );
};

export default IntroPage;