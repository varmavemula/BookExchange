import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const resetEmail = sessionStorage.getItem('resetEmail');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect to forgot password if email is not in session
    if (!resetEmail) {
      navigate('/forgot-password');
    }
  }, [navigate, resetEmail]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      // Add your API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear session storage
      sessionStorage.removeItem('resetEmail');
      
      // Redirect to login with success message
      navigate('/login', { 
        state: { message: 'Password reset successful. Please login with your new password.' }
      });
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
              <KeyRound className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Reset Password
            </h2>
            <p className="text-white/70">
              Create a new password for your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg backdrop-blur-md bg-red-500/10 border border-red-500/20 text-red-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-white/90 font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white placeholder-gray-400 
                           backdrop-blur-md transition-all duration-300"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 
                           hover:text-white transition-colors duration-300"
                >
                  {showPassword.password ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white/90 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white placeholder-gray-400 
                           backdrop-blur-md transition-all duration-300"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 
                           hover:text-white transition-colors duration-300"
                >
                  {showPassword.confirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg backdrop-blur-md transition-all duration-300 
                       ${isLoading 
                         ? 'bg-emerald-500/30 cursor-not-allowed' 
                         : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                       } text-white font-semibold`}
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;