import React, { useState } from 'react';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../context/ContextProvider.jsx'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  const {user,logout} = useAuth()
  const logoutUser = ()=>{
    logout()
    navigate('/login')
    window.location.reload()
  }
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-bold text-2xl">
          <Link to="/">NOTES</Link>
        </div>

        {/* Search bar */}
        <div className="flex-grow mx-6">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* Buttons */}
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <button 
                className="flex items-center space-x-1 text-white hover:text-gray-200 font-semibold transition"
                onClick={logoutUser}
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
              <span className="text-white font-semibold">{user.name}</span>
            </>
          ) : (
            <>
              <Link to="/login"
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 hover:bg-gray-100 shadow"
              >
                <FiLogIn className="text-lg" />
                <span>Login</span>
              </Link>
              <Link to="/register"
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105 hover:bg-gray-100 shadow"
              >
                <FiUserPlus className="text-lg" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
