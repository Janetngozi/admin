'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function PersonalOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(47);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  // Countdown timer
  useEffect(() => {
    if (!isTimerActive || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const formatTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setErrorMessage('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const enteredOtp = otp.join('');
    const demoValid = '602148';

    if (enteredOtp.length !== 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    if (enteredOtp !== demoValid) {
      setErrorMessage('The 6 digit code you entered is incorrect. Please try again or request a new code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/signin');
    }, 1000);
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeLeft(47);
    setIsTimerActive(true);
    setErrorMessage('');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image (Fixed) */}
      <div className="hidden lg:flex lg:w-1/2 fixed left-0 top-0 h-screen">
        <img
          src="/rectangle_111.png"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 lg:ml-auto flex items-center justify-center min-h-screen p-4 overflow-y-auto relative">
        {errorMessage && (
          <div className="absolute top-4 left-8 right-8 bg-red-600 text-white text-sm py-2 px-4 rounded-sm text-center z-10">
            {errorMessage}
          </div>
        )}

        <div className={`w-full max-w-md ${errorMessage ? 'opacity-50 transition-opacity' : ''}`}>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/STEC-logo 1.png" alt="STEC Logo" className="h-16 w-auto" />
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Verify One-Time Password
          </h1>
          <p className="text-center text-gray-600 text-xs mb-2">
            Enter the 6-digit code we sent to your your email address.
          </p>
          <p className="text-center text-gray-600 text-xs mb-8">
            Johndoe123@gmail.com
          </p>

          {/* OTP Inputs */}
          <div className="flex gap-2 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={isLoading || otp.some((digit) => !digit)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm text-sm"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>

          {/* Timer and Resend */}
          <div className="text-center mt-6">
            {isTimerActive ? (
              <p className="text-xs text-gray-600">
                Resend code in <span className="font-semibold text-gray-900">{formatTimer()}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
              >
                Resend Code
              </button>
            )}
          </div>

          {/* Not your email */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              Not your email address?{' '}
              <a href="/auth/signup/personal" className="text-blue-600 hover:text-blue-700 font-semibold">
                Edit Email
              </a>
            </p>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
