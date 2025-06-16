import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useRegister from '../hooks/useRegister';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, loading, error: registerError } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(fullName, username, email, password);
    if (result) {
      navigate('/');
    }
  };

  return (
  <div className="max-w-md mx-auto mt-16 p-8 border border-gray-200 rounded-lg shadow-md bg-white">
    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {(error || registerError) && <div className="text-red-500 text-sm">{error || registerError}</div>}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        Register
      </button>
    </form>
    <div className="mt-4 text-center text-sm">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
    </div>
  </div>
);
};

export default Register;