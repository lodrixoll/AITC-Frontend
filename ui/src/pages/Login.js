import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate(); // Initialize useNavigate

    // Dummy function for handling "Forgot password" click
    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
    };

    // Dummy function for handling "Start a 14 day free trial" click
    const handleStartFreeTrial = () => {
        console.log("Start free trial clicked");
        navigate('/register'); // Navigate to the registration page
    };

    return (
        <div className="flex min-h-full items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-xl p-10">
                <div className="text-center">
                    <img className="mx-auto h-20 w-20" src={`${process.env.PUBLIC_URL}/deal.png`} alt="Your Company" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>

                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-linkBlue focus:border-linkBlue focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-linkBlue focus:border-linkBlue focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <button type="button" className="font-medium text-linkBlue hover:text-blue-700" onClick={handleForgotPassword}>Forgot your password?</button>
                        </div>
                    </div>

                    <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-customRed hover:bg-customRedDarker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Sign in
                    </button>
                    </div>
                </form>

                <p className="mt-2 text-center text-sm text-gray-600">
                    Not a member?&nbsp;
                    <button type="button" className="font-medium text-linkBlue hover:text-blue-700" onClick={handleStartFreeTrial}>Start a 14 day free trial</button>
                </p>
            </div>
        </div>
    );
}

export default Login;