// OTPInput.js
// A component for handling OTP (One-Time Password) input with validation and verification
import React, { useState, useRef, useEffect } from 'react';

/**
 * OTPInput Component
 * Provides a user interface for entering and verifying OTP codes
 * 
 * @param {number} length - Number of OTP digits (default: 6)
 * @param {function} onComplete - Callback function when OTP is fully entered
 */
const OTPInput = ({ length = 6, onComplete }) => {
  // State Management
  const [otp, setOtp] = useState(new Array(length).fill('')); // Array to store OTP digits
  const [activeIndex, setActiveIndex] = useState(0);          // Currently focused input
  const inputRefs = useRef([]);                              // References to input elements
  const [isVerifying, setIsVerifying] = useState(false);     // Verification status
  const [error, setError] = useState('');                    // Error message
  const [timeLeft, setTimeLeft] = useState(30);              // Resend timer countdown
  const [canResend, setCanResend] = useState(false);         // Resend button state

  // Timer Effect: Handles countdown for OTP resend
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      // Cleanup interval on unmount
      return () => clearInterval(timerInterval);
    } else if (timeLeft === 0) {
      setCanResend(true); // Enable resend button when timer reaches 0
    }
  }, [timeLeft, canResend]);

  // Auto-focus first input on component mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /**
   * Handles input change events
   * @param {Event} e - Change event
   * @param {number} index - Current input index
   */
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Validate numeric input

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Take last digit only
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }

    // Check for OTP completion
    const otpValue = newOtp.join('');
    if (otpValue.length === length) {
      onComplete?.(otpValue);
    }
  };

  /**
   * Handles keyboard navigation between inputs
   * @param {KeyboardEvent} e - Keyboard event
   * @param {number} index - Current input index
   */
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Clear previous input and move focus back
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  /**
   * Handles paste events for OTP
   * @param {ClipboardEvent} e - Paste event
   */
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(pastedData)) return; // Validate numeric input

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus appropriate input after paste
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
    setActiveIndex(focusIndex);

    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  /**
   * Handles OTP verification
   */
  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== length) {
      setError('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);
    try {
      // Verification logic goes here
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('OTP Verified:', otpValue);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  /**
   * Handles OTP resend request
   */
  const handleResendOTP = async () => {
    setCanResend(false);
    setTimeLeft(30);
    setOtp(new Array(length).fill(''));
    inputRefs.current[0]?.focus();
    setActiveIndex(0);
    setError('');

    try {
      // Resend logic goes here
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('OTP Resent');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      setCanResend(true);
    }
  };

  // Component Render
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 p-4">
      <div className="w-full max-w-md">
        {/* Main Card Container */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Header Section */}
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Verify Your Email
          </h2>
          <p className="text-white/70 text-center mb-8">
            Please enter the verification code sent to your email
          </p>

          {/* OTP Input Group */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`w-12 h-14 text-center text-xl font-semibold rounded-lg 
                         bg-white/5 border ${index === activeIndex
                    ? 'border-emerald-400/50'
                    : 'border-white/10'
                  } focus:border-emerald-400/50 focus:outline-none focus:ring-2 
                         focus:ring-emerald-400/20 text-white transition-all duration-300`}
              />
            ))}
          </div>

          {/* Error Display */}
          {error && (
            <div className="text-red-400 text-sm text-center mb-4">{error}</div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isVerifying || otp.join('').length !== length}
            className={`w-full py-3 rounded-lg backdrop-blur-md transition-all duration-300 
                     ${isVerifying || otp.join('').length !== length
                ? 'bg-emerald-500/30 cursor-not-allowed'
                : 'bg-emerald-500/50 hover:bg-emerald-500/70 border border-emerald-400/30'
              } text-white font-semibold`}
          >
            {isVerifying ? 'Verifying...' : 'Verify OTP'}
          </button>

          {/* Resend Option */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                >
                  Resend OTP
                </button>
              ) : (
                <span>
                  Resend OTP in <span className="text-emerald-400">{timeLeft}s</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;