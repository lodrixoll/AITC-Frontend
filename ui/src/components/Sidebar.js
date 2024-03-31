import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome, FaExchangeAlt, FaEnvelope, FaCalendarAlt, FaCog } from 'react-icons/fa';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate for redirection
    const { setCurrentUser } = useAuth(); // Uncomment if using AuthContext to manage state

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        setCurrentUser(null); // Uncomment if using AuthContext to manage state
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="w-64 min-h-screen bg-gray-800 text-white">
            <div className="flex items-center justify-between h-20 shadow-md px-5">
                <h1 className="text-3xl font-semibold">AITC</h1>
                <button onClick={handleLogout} className="text-customRed hover:text-customRedDarker">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
            <ul className="flex flex-col py-4">
                <li>
                <Link to="/dashboard" className={`flex items-center p-4 ${isActive('/dashboard') ? 'bg-customRed' : 'hover:bg-customRed'}`}>
                    <FaHome className="mr-2" /> <span>Dashboard</span>
                </Link>
                </li>
                <li>
                    <Link to="/transactions" className={`flex items-center p-4 ${isActive('/transactions') ? 'bg-customRed' : 'hover:bg-customRed'}`}>
                        <FaExchangeAlt className="mr-2" /> <span>Transactions</span>
                    </Link>
                </li>
                <li>
                    <Link to="/emails" className={`flex items-center p-4 ${isActive('/emails') ? 'bg-customRed' : 'hover:bg-customRed'}`}>
                        <FaEnvelope className="mr-2" /> <span>Email</span>
                    </Link>
                </li>
                <li>
                    <Link to="/calendar" className={`flex items-center p-4 ${isActive('/calendar') ? 'bg-customRed' : 'hover:bg-customRed'}`}>
                        <FaCalendarAlt className="mr-2" /> <span>Calendar</span>
                    </Link>
                </li>
                <li>
                    <Link to="/settings" className={`flex items-center p-4 ${isActive('/settings') ? 'bg-customRed' : 'hover:bg-customRed'}`}>
                        <FaCog className="mr-2" /> <span>Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;