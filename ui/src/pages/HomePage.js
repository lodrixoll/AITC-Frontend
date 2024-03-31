import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-5 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-900">Real Estate Dashboard</h1>
                </div>
                <ul className="py-6">
                    <li className="pl-6 py-2 hover:bg-gray-50">
                        <Link to="/transactions" className="text-gray-700 hover:text-linkBlue">Transactions</Link>
                    </li>
                    <li className="pl-6 py-2 hover:bg-gray-50">
                        <Link to="/emails" className="text-gray-700 hover:text-linkBlue">Emails</Link>
                    </li>
                    <li className="pl-6 py-2 hover:bg-gray-50">
                        <Link to="/settings" className="text-gray-700 hover:text-linkBlue">Settings</Link>
                    </li>
                </ul>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800">Active Listings</h3>
                        <p className="text-lg text-gray-600 mt-2">42</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800">Pending Transactions</h3>
                        <p className="text-lg text-gray-600 mt-2">17</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800">New Messages</h3>
                        <p className="text-lg text-gray-600 mt-2">5</p>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800">Recent Transactions</h3>
                    {/* Placeholder for recent transactions list */}
                </div>
            </div>
        </div>
    );
}

export default HomePage;