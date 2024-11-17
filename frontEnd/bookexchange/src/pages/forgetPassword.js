import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, KeyRound, LockKeyhole, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: 'Email Verification', icon: Mail },
    { number: 2, title: 'OTP Verification', icon: KeyRound },
    { number: 3, title: 'Reset Password', icon: LockKeyhole }
  ];

  // Handle email submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/forgot-password', {
        email
      });

      setSuccessMessage('OTP sent successfully!');
      setTimeout(() => {
        setStep(2);
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/verify-otp', {
        email,
        otp
      });

      setSuccessMessage('OTP verified successfully!');
      setTimeout(() => {
        setStep(3);
        setSuccessMessage('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/reset-password', {
        email,
        otp,
        newPassword: password
      });

      setSuccessMessage('Password reset successful!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center 
                             ${step >= s.number
                        ? 'bg-emerald-500/20 border-emerald-500'
                        : 'bg-white/5 border-white/20'} 
                             border-2 transition-all duration-300`}
                  >
                    <s.icon
                      className={`w-5 h-5 ${step >= s.number ? 'text-emerald-400' : 'text-white/50'
                        }`}
                    />
                  </div>
                  <span className={`mt-2 text-xs ${step >= s.number ? 'text-white' : 'text-white/50'
                    }`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-[2px] flex-1 mx-4 ${step > s.number ? 'bg-emerald-500/50' : 'bg-white/10'
                    }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
              {successMessage}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg backdrop-blur-md transition-all duration-300 
                         ${loading
                    ? 'bg-emerald-500/30 cursor-not-allowed'
                    : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                  } text-white font-semibold`}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white placeholder-gray-400"
                  placeholder="Enter OTP"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 rounded-lg border border-white/10 
                           text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 rounded-lg backdrop-blur-md transition-all duration-300 
                           ${loading
                      ? 'bg-emerald-500/30 cursor-not-allowed'
                      : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                    } text-white font-semibold`}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white placeholder-gray-400"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div>
                <label className="block text-white/90 font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                           focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                           focus:ring-emerald-400/20 text-white placeholder-gray-400"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 px-4 rounded-lg border border-white/10 
                           text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-3 rounded-lg backdrop-blur-md transition-all duration-300 
                           ${loading
                      ? 'bg-emerald-500/30 cursor-not-allowed'
                      : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
                    } text-white font-semibold`}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-white/70 hover:text-white transition-colors duration-300 
                       inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;