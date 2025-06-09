import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';
import { logout } from '../redux/slices/authSlice';

function Navbar() {
  // Add fallback empty object to prevent destructuring undefined
  const { user, isAuthenticated } = useSelector((state) => state.auth || { user: null, isAuthenticated: false });
  const dispatch = useDispatch();
  const location = useLocation();

  const tabClass = (to) =>
    `relative px-2 py-1 transition-colors duration-200 group
    ${location.pathname === to ? 'text-yellow-400' : 'text-white'}
    hover:text-yellow-400`;

  const underlineClass = (to) =>
    `absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 origin-left transition-all duration-300
    ${location.pathname === to ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100`;

  return (
    <nav className="bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3">
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        <span className="text-2xl font-bold flex items-center">
          <span className="mr-2">☁️</span> WeatherWise
        </span>
      </div>
      <div className="flex items-center gap-4 md:gap-6 flex-wrap">
        <Link to="/" className={tabClass('/')}>
          <span className="relative z-10">Home</span>
          <span className={underlineClass('/')}></span>
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/city-map" className={tabClass('/city-map')}>
              <span className="relative z-10">City Map</span>
              <span className={underlineClass('/city-map')}></span>
            </Link>
            <Link to="/dashboard" className={tabClass('/dashboard')}>
              <span className="relative z-10">Weather Dashboard</span>
              <span className={underlineClass('/dashboard')}></span>
            </Link>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className={tabClass('/login')}>
              <span className="relative z-10">Login</span>
              <span className={underlineClass('/login')}></span>
            </Link>
            <Link to="/signup" className={tabClass('/signup')}>
              <span className="relative z-10">Signup</span>
              <span className={underlineClass('/signup')}></span>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            <Avatar name={user?.username || "User"} size="35" round={true} />
            <button
              onClick={() => dispatch(logout())}
              className="ml-2 text-sm text-purple-400 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
