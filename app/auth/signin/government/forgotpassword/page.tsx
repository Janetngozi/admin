'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendReset = () => {
    setIsLoading(true);
    console.log('Send reset instructions to:', email);
    // Simulate sending reset instructions
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP verification page
      router.push('/auth/signin/government/otp');
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email) {
      handleSendReset();
    }
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
      <div className="w-full lg:w-1/2 lg:ml-auto flex items-center justify-center min-h-screen p-4 overflow-y-auto">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/STEC-logo 1.png" alt="STEC Logo" className="h-16 w-auto" />
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Forgot your password?
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            Enter your email address and we will send you reset instructions
          </p>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
              />
            </div>

            {/* Send Reset Button */}
            <button
              onClick={handleSendReset}
              disabled={isLoading || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </div>

          {/* Back to Sign In Link */}
          <p className="text-center text-gray-600 text-sm mt-8">
            Remember your password?{' '}
            <a href="/auth/signin/government" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}