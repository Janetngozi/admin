'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GovernmentSignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!firstName.trim()) {
      setErrorMessage('First name is required');
      return false;
    }
    if (!lastName.trim()) {
      setErrorMessage('Last name is required');
      return false;
    }
    if (!email.includes('@')) {
      setErrorMessage('Please use a verified government or institutional email address.');
      return false;
    }
    // Check for government/institutional email domains
    const governmentDomains = ['.gov', '.edu', '.mil', '.org'];
    const hasGovDomain = governmentDomains.some(domain => email.toLowerCase().endsWith(domain));
    if (!hasGovDomain) {
      setErrorMessage('Please use a verified government or institutional email address.');
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
    console.log('Government sign up details:', { firstName, lastName, email });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Store details and go to create password page
      router.push('/auth/signup/government/createpassword');
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
            Create a government account
          </h1>
          <p className="text-center text-gray-600 text-xs mb-8">
            Register your agency or department to access government pricing, bulk purchasing, and invoice options.
          </p>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-4">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full px-3 py-2 text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full px-3 py-2 text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Johndoe123@domain.gov"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="w-full px-3 py-2 text-gray-700 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">(e.g. .gov, .mil, .edu, or any verified domain)</p>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              disabled={isLoading || !firstName || !lastName || !email}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 shadow-sm text-sm mt-6"
            >
              {isLoading ? 'Continuing...' : 'Continue'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 text-xs mt-8">
            Already have an account?{' '}
            <a href="/auth/signin/government" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
