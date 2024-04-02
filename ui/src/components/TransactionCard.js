import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaBuilding, FaPhone, FaEnvelope, FaUserTie, FaHome, FaPlusCircle } from 'react-icons/fa';

const TransactionCard = ({ isLoading, ragResponse, expanded, toggleTransaction }) => {
    const baseClass = "border bg-white shadow-lg rounded-lg transition-all duration-1000 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl";
    const expandedClass = expanded ? "max-h-screen p-6" : "max-h-24 p-4";
    const pointerClass = "cursor-pointer";
    const [contentOpacity, setContentOpacity] = useState(0);

    useEffect(() => {
        let fadeTimeout;
        if (expanded) {
            fadeTimeout = setTimeout(() => setContentOpacity(1), 1000);
        } else {
            setContentOpacity(0);
        }
        return () => clearTimeout(fadeTimeout);
    }, [expanded]);

    if (!expanded) {
        return (
            <div className={`${baseClass} ${expandedClass} ${pointerClass}`} onClick={toggleTransaction}>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{ragResponse.address}</span>
                    <span>▼</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`${baseClass} ${expandedClass} ${pointerClass}`}>
            <div className="flex flex-wrap md:flex-nowrap -mx-4" style={{ opacity: contentOpacity, transition: 'opacity 200ms ease-in-out' }}>
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0 relative">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Contacts</h3>
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                        ) : (
                            Object.entries(ragResponse || {}).filter(([key]) => key !== 'id' && key !== 'address').map(([key, value], index) => (
                                <div key={key} className="flex items-center bg-gray-100 p-3 rounded-lg shadow" style={{ opacity: contentOpacity, transition: `opacity 500ms ease-in-out ${index * 100}ms` }}>
                                    <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
                                        {key === 'Seller' && <FaHome />}
                                        {key === 'Listing Agent' && <FaUserTie />}
                                        {key === 'Listing Broker' && <FaBuilding />}
                                        {key === 'Buyer' && <FaUserAlt />}
                                        {key === "Buyer's Agent" && <FaUserTie />}
                                        {key === "Buyer's Broker" && <FaBuilding />}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold">{key.replace(/_/g, ' ')}</p>
                                        <p>{value}</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <div className="flex items-center text-sm text-gray-600 mb-1">
                                            <FaEnvelope className="inline mr-2" />
                                            <span className="mr-2">Add email</span>
                                            <FaPlusCircle className="cursor-pointer text-green-500" />
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaPhone className="inline mr-2" />
                                            <span className="mr-2">Add phone</span>
                                            <FaPlusCircle className="cursor-pointer text-green-500" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Property Details</h3>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
                        <p>Details to be defined...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
