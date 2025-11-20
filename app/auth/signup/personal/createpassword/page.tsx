'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    console.log('Password set:', { password });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Go to OTP verification
      router.push('/auth/signup/personal/otp');
    }, 1000);
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
            Create a new password
          </h1>
          <p className="text-center text-gray-600 text-xs mb-8">
            Choose a secure password to protect your account.
          </p>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-4">
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full px-3 py-2 text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full px-3 py-2 text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isLoading || !password || !confirmPassword}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm text-sm mt-6"
            >
              {isLoading ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          {/* Terms */}
          <p className="text-center text-gray-600 text-xs mt-8">
            By selecting Sign Up, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              User Agreement
            </a>
            {' '}and acknowledge reading our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              User Privacy Notice
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
