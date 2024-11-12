import React, { useState } from 'react';
import { User, LogOut, Book, ChevronDown } from 'lucide-react';


const Layout = ({ children }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const userId = localStorage.getItem('id');
    const username = localStorage.getItem('username') || 'User';
    

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/10 shadow-lg z-50 border-b border-white/20">
                <div className="w-full px-8 py-4 flex items-center justify-between">
                    {/* Profile Button and Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 
                           backdrop-blur-md text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                                <User className="h-4 w-4 text-white" />
                            </div>
                            <span className="hidden sm:block">{username}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {isProfileMenuOpen && (
                            <div className="absolute top-full mt-2 w-48 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 
                              shadow-lg overflow-hidden transform transition-all duration-300">
                                <div className="p-3 border-b border-white/10">
                                    <p className="text-sm text-white/80">Signed in as</p>
                                    <p className="text-sm font-semibold text-white">{username}</p>
                                </div>
                                <button
                                    onClick={() => window.location.href = '/profile'}
                                    className="w-full px-4 py-2 flex items-center gap-2 text-white/90 hover:bg-white/10 transition-colors duration-200"
                                >
                                    <User className="h-4 w-4" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={() => window.location.href = '/my-books'}
                                    className="w-full px-4 py-2 flex items-center gap-2 text-white/90 hover:bg-white/10 transition-colors duration-200"
                                >
                                    <Book className="h-4 w-4" />
                                    <span>My Books</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 flex items-center gap-2 text-red-400 hover:bg-white/10 transition-colors duration-200"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Center Title */}
                    <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                        Book Exchange System
                    </h1>

                    {/* Navigation */}
                    <nav className="flex items-center gap-4">
                        <ul className="flex items-center gap-4">
                            <li>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md 
                             text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => window.location.href = '/books'}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md 
                             text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Add Book
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => window.location.href = '/exchange'}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md 
                             text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Exchange
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => window.location.href = '/chat'}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md 
                             text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Chat
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => window.location.href = '/notifications'}
                                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md 
                             text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Notifications
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-8">
                {/* Spacer div to push content below fixed header */}
                <div className="h-24"></div>

                {/* Content wrapper with padding */}
                <div className="py-8">
                    {children}
                </div>

                {/* Spacer div to prevent footer overlap */}
                <div className="h-20"></div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/5 border-t border-white/10 py-4">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-white/60">&copy; 2024 Book Exchange System</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;