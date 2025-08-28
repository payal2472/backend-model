import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, ArrowRight, Shield, Check } from 'lucide-react';
import useRegister from '../hooks/useRegister';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, loading, error: registerError } = useRegister();

  // Password strength validation
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await register(fullName, username, email, password);
    if (result) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/emmanuel-appiah-d4xr5jN5f3g-unsplash.jpg')" }}>
      {/* Overlay to reduce background opacity */}
      <div className="absolute inset-0 bg-gray-300/40 bg-opacity-40"></div>
      <div className="w-full max-w-md bg-gray-200  rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col items-center relative z-10">
                {/* Top Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 shadow">
          <Shield className="w-7 h-7 text-gray-700" />
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Create your account</h2>
        <p className="text-gray-500 text-center mb-6">
          Join us and start your journey today
        </p>
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              required
            />
          </div>

                      <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          {/* <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowConfirmPassword((v) => !v)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div> */}

                      <div className="flex justify-between items-center text-sm">
            <span />
            <Link to="/login" className="text-gray-500 hover:text-blue-600">Already have an account?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow hover:bg-gray-800 transition"
          >
            Create Account
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center w-full my-6">
          <div className="flex-grow border-t border-gray-400" />
          <span className="mx-4 text-gray-400 text-sm hover:text-black cursor-pointer" onClick={() => navigate('/login')}>or sign in with</span>
          <div className="flex-grow border-t border-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Register;