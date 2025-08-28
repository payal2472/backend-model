import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error: loginError } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result) {
      navigate('/');
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/emmanuel-appiah-d4xr5jN5f3g-unsplash.jpg')" }}>
      {/* Overlay to reduce background opacity */}
      <div className="absolute inset-0 bg-gray-300/40 bg-opacity-40"></div>
      <div className="w-full max-w-md bg-gray-200 rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col items-center relative z-10">
        {/* Top Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 shadow">
          <ArrowRight className="w-7 h-7 text-gray-700" />
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Sign in with email</h2>
        <p className="text-gray-500 text-center mb-6">
          
        </p>
        {/* Form */}
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              required
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none transition"
              required
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span />
            <a href="#" className="text-gray-500 hover:text-blue-600">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold shadow hover:bg-gray-800 transition"
          >
            Sign In 
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center w-full mt-6">
          <div className="flex-grow border-t border-gray-400" />
          <span className="mx-4 text-gray-400 text-sm hover:text-black cursor-pointer" onClick={() => navigate('/register')}>or create a new account</span>
          <div className="flex-grow border-t border-gray-400" />
        </div>
      </div>
    </div>

);
};

export default Login;

