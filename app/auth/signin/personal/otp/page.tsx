'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(47);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  // clear any previous error when user edits
  if (errorMessage) setErrorMessage('');

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

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    
    pastedData.forEach((char, index) => {
      if (/^\d$/.test(char) && index < 6) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    
    // Focus last filled input or next empty
    const lastFilledIndex = newOtp.findIndex((val) => !val);
    const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleContinue = () => {
    if (otp.every((digit) => digit !== '')) {
      setIsLoading(true);
      console.log('OTP:', otp.join(''));
      setTimeout(() => {
        // Demo validation: replace with real verification
        const entered = otp.join('');
        const demoValid = '602148';
        if (entered === demoValid) {
          router.push('/auth/signin/personal/resetpassword');
          setErrorMessage('');
          console.log('OTP valid (demo)');
        } else {
          setErrorMessage("The 6 digit code you entered is incorrect. Please check the code and try again. If you didn't receive a code, request a new one.");
        }
        setIsLoading(false);
      }, 800);
    }
  };

  const handleResend = () => {
    setTimer(47);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    console.log('Resend OTP');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `00:${secs.toString().padStart(2, '0')}`;
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

      {/* Right Side - OTP Form */}
      <div className="w-full lg:w-1/2 lg:ml-auto flex items-center justify-center min-h-screen p-4 overflow-y-auto relative">
        {errorMessage && (
          <div className="absolute top-4 left-8 right-8 bg-red-600 text-white text-sm py-2 px-4 rounded-sm text-center z-10">
            {errorMessage}
          </div>
        )}
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/STEC-logo 1.png" alt="STEC Logo" className="h-16 w-auto" />
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Verify One-Time Password
          </h1>
          <p className="text-center text-gray-500 text-sm mb-2">
            Enter the 6-digit code we sent to your email address
          </p>
          <p className="text-center text-gray-900 text-sm font-medium mb-8">
            Johndoe123@gmail.com
          </p>

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center text-2xl font-semibold text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            ))}
          </div>

         {/* Timer or Resend Button */}
          {timer > 0 ? (
            <p className="text-center text-gray-500 text-sm mb-6">
              Resend code in: <span className="font-semibold text-gray-900">{formatTimer(timer)}</span>
            </p>
          ) : (
            <div className="text-center mb-6">
              <button
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm underline"
              >
                Resend Code
              </button>
            </div>
          )}

          {/* Edit Email Link */}
          <div className="text-center mb-8">
            <span className="text-gray-600 text-sm">Not your email address? </span>
            <a href="/auth/signin/personal/forgotpassword" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              Edit Email
            </a>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={isLoading || otp.some((digit) => digit === '')}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}