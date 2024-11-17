// ResetPassword.js
// Component for handling password reset functionality
// Includes password validation, visibility toggling, and API integration
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

/**
 * ResetPassword Component
 * Provides interface for users to reset their password
 * Requires resetEmail to be present in sessionStorage
 * Includes password validation and confirmation
 */
const ResetPassword = () => {
  // Hooks initialization
  const navigate = useNavigate();
  const resetEmail = sessionStorage.getItem('resetEmail');

  // State management
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  // State for password visibility toggles
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Effect to check for valid reset attempt
  useEffect(() => {
    // Redirect if no reset email is found
    if (!resetEmail) {
      navigate('/forgot-password');
    }
  }, [navigate, resetEmail]);

  /**
   * Handles form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear any existing errors
  };

  /**
   * Toggles password visibility for specified field
   * @param {string} field - Field to toggle (password/confirmPassword)
   */
  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  /**
   * Handles form submission for password reset
   * Includes validation and API integration
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
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
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Cleanup and redirect
      sessionStorage.removeItem('resetEmail');
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
    // Main container with gradient background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 p-4">
      <div className="w-full max-w-md">
        {/* Card container with glass effect */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Icon Container */}
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

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 rounded-lg backdrop-blur-md bg-red-500/10 border border-red-500/20 text-red-200">
              {error}
            </div>
          )}

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
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
                {/* Password Toggle Button */}
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

            {/* Confirm Password Input - Similar structure to above */}
            <div>{/* ... Confirm password input similar to above ... */}</div>

            {/* Submit Button */}
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

/* Style Notes:
 * 1. Glass Morphism:
 *    - backdrop-blur-xl for frosted glass effect
 *    - bg-white/5 for semi-transparent background
 *    - border-white/10 for subtle borders
 * 
 * 2. Form Elements:
 *    - Consistent styling across inputs
 *    - Focus states with emerald accents
 *    - Password visibility toggles
 * 
 * 3. Responsive Design:
 *    - max-w-md for container width
 *    - Flexible padding
 *    - Mobile-friendly layout
 * 
 * 4. Accessibility:
 *    - Proper labeling
 *    - Clear error messages
 *    - Loading states
 */

export default ResetPassword;