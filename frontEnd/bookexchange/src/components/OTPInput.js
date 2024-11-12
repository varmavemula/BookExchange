import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    // Take only the last entered digit
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError('');

    // Move to next input if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }

    // Check if OTP is complete
    const otpValue = newOtp.join('');
    if (otpValue.length === length) {
      onComplete?.(otpValue);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current input is empty
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

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d+$/.test(pastedData)) return; // Only allow numbers

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus last filled input or the next empty one
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
    setActiveIndex(focusIndex);

    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== length) {
      setError('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);
    try {
      // Add your verification logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      // If verification successful
      console.log('OTP Verified:', otpValue);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setTimeLeft(30);
    setOtp(new Array(length).fill(''));
    inputRefs.current[0]?.focus();
    setActiveIndex(0);
    setError('');
    
    try {
      // Add your resend OTP logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      console.log('OTP Resent');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      setCanResend(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 shadow-2xl">
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

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center mb-4">
              {error}
            </div>
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

          {/* Resend Section */}
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