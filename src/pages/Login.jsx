import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('LoginPage mounted - ready for API integration');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Login to Your Account</h1>
        <p className="text-gray-600 mb-6">
          Welcome back! Please enter your credentials.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-[#C19A6B] rounded 
                       focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#C19A6B] rounded 
                       focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#B6865A] text-black py-2 rounded border border-[#C19A6B]
                       hover:bg-[#5D3A1A] hover:text-white transition font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-lg text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 