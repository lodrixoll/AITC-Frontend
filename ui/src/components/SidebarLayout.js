import React from 'react';
import Sidebar from './Sidebar';

function SidebarLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}

export default SidebarLayout;