import React from 'react';

function Registration() {
    // Dummy function for handling "Forgot password" click
    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
    };

    // Dummy function for handling "Start a 14 day free trial" click
    const handleStartFreeTrial = () => {
        console.log("Start free trial clicked");
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-40 w-40" src={`${process.env.PUBLIC_URL}/deal.png`} alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <button type="button" className="font-semibold text-linkBlue hover:text-blue-700" onClick={handleForgotPassword}>Forgot password?</button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-3000 placeholder:text-gray-4000 focus:ring-1 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-customRed px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customRed">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?&nbsp; 
                    <button type="button" className="font-semibold leading-6 text-linkBlue hover:text-blue-700" onClick={handleStartFreeTrial}>Start a 14 day free trial</button>
                </p>
            </div>
        </div>
    );
}

export default Registration;