import React, { useState } from 'react';

function Settings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [theme, setTheme] = useState('light');

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleEmailNotificationChange = (event) => {
        setEmailNotifications(event.target.checked);
    };

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="emailNotifications" className="flex items-center cursor-pointer">
                        <input
                            id="emailNotifications"
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={emailNotifications}
                            onChange={handleEmailNotificationChange}
                        />
                        <span className="ml-2 text-gray-700">Email Notifications</span>
                    </label>
                </div>
                <div>
                    <label htmlFor="theme" className="block text-gray-700">Theme</label>
                    <select
                        id="theme"
                        value={theme}
                        onChange={handleThemeChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Settings;