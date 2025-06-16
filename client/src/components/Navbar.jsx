import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage (or clear cookies if using cookies)
    localStorage.removeItem('accessToken');
    // Optionally, you could also call your backend logout endpoint here
    navigate('/login');
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 b text-black shadow">
      <div className="text-lg font-bold">Todo App</div>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
