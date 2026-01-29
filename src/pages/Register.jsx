import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [customerType, setCustomerType] = useState('retailer');
  const [gstNumber, setGstNumber] = useState('');
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('SignupPage mounted - ready for API integration');
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (customerType === 'wholesaler') {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(gstNumber)) {
        setError('Please enter a valid GST number (15 characters, proper format).');
        return;
      }
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError('');

    const payload = {
      username,
      email,
      password,
      customerType,
      gstNumber: customerType === 'wholesaler' ? gstNumber : null,
      gender,
      mobile,
    };

    console.log('Submitting:', payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <div className="border rounded-md bg-[#B6865A] inline-block px-9 mb-8 hover:bg-[#5D3A1A] hover:text-white text-black cursor-pointer">
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => navigate("/AdminPage")}
          >
            Admin?
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
        <p className="text-gray-600 mb-6">Please fill in your details to sign up.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-[#C19A6B] rounded focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
            required
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#C19A6B] rounded focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#C19A6B] rounded focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
            required
          />

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#C19A6B] rounded focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
            required
          />

          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 border border-[#C19A6B] rounded focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
            required
          />

          <div className="text-left">
            <p className="text-gray-700 mb-2 font-medium">Gender:</p>
            <div className="flex space-x-6">
              {['male', 'female', 'other'].map((g) => (
                <label key={g} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-left">
            <p className="text-gray-700 mb-2 font-medium">Customer Type:</p>
            <div className="flex space-x-6">
              {['retailer', 'wholesaler'].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="customerType"
                    value={type}
                    checked={customerType === type}
                    onChange={(e) => setCustomerType(e.target.value)}
                  />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {customerType === 'wholesaler' && (
            <input
              type="text"
              placeholder="Enter GST Number"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
              className="w-full px-4 py-2 border border-[#C19A6B] rounded focus:outline-none focus:ring-2 focus:ring-[#C19A6B]"
              required
            />
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#B6865A] text-black py-2 rounded border border-[#C19A6B]
                       hover:bg-[#5D3A1A] hover:text-white   transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-lg text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p></div>
    </div>
  );
};

export default Register;