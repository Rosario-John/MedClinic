import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send a password reset email here
    setIsSubmitted(true);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full mx-auto">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-8`}>
          <Link 
            to="/login"
            className={`inline-flex items-center text-sm ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
            } mb-6`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>

          <div className="text-center mb-8">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Reset Password
            </h1>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {isSubmitted ? (
            <div className={`rounded-lg p-4 ${
              isDark ? 'bg-green-900 text-green-200' : 'bg-green-50 text-green-800'
            }`}>
              <p className="text-center">
                If an account exists with the email <strong>{email}</strong>, 
                you will receive password reset instructions shortly.
              </p>
              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium ${
                    isDark
                      ? 'text-gray-200 hover:text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Return to login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Reset Instructions
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} MedClinic. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;