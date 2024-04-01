import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

function Login() {

    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
    };

    const handleStartFreeTrial = () => {
        console.log("Start free trial clicked");
        navigate('/register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }
            console.log(data.message);
            localStorage.setItem('token', data.token);
            setCurrentUser({ token: data.token });
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-8">
            <div className="w-full max-w-lg space-y-8 bg-white rounded-lg shadow-lg p-10">
                <div className="text-center">
                    <img className="mx-auto h-20 w-20" src={`${process.env.PUBLIC_URL}/deal.png`} alt="Your Company" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    {error && (
                        <div className={`mb-4 text-center p-2 text-sm text-red-700 bg-red-100 rounded-lg ${error ? 'fade-in' : ''}`}>
                            {error}
                        </div>
                    )}

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-customRed hover:bg-customRedDarker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Sign in
                        </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                            <button type="button" className="font-medium text-linkBlue hover:text-blue-700" onClick={handleForgotPassword}>Forgot your password?</button>
                        </div>
                        <div className="text-sm">
                            <button type="button" className="font-medium text-linkBlue hover:text-blue-700" onClick={handleStartFreeTrial}>Sign up for free</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;