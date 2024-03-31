import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Registration() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setErrorMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log("Registration successful");
                navigate('/home'); // Navigate to the home page
            } else if (response.status === 409) {
                console.error("Email already in use");
                setErrorMessage("Email already in use. Please try another email.");
            } else {
                console.error("Registration failed");
                setErrorMessage("Registration failed. Please try again later.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("An error occurred during registration. Please check your connection and try again.");
        }
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-8">
            <div className="w-full max-w-lg space-y-8 bg-white rounded-lg shadow-lg p-10">
                <div className="text-center">
                    <img className="mx-auto h-20 w-20" src={`${process.env.PUBLIC_URL}/deal.png`} alt="Your Company" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input id="password" name="password" type="password" autoComplete="new-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    {errorMessage && (
                        <div className={`mb-4 text-center p-2 text-sm text-red-700 bg-red-100 rounded-lg ${errorMessage ? 'fade-in' : ''}`}>
                            {errorMessage}
                        </div>
                    )}
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-customRed hover:bg-customRedDarker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button type="button" onClick={handleBackToLogin} className="font-medium text-linkBlue hover:text-blue-700">
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registration;