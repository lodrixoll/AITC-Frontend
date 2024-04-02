import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUserAlt, FaBuilding, FaPhone, FaEnvelope, FaUserTie, FaHome, FaPlusCircle } from 'react-icons/fa';


const Transactions = () => {
    const [ragResponse, setRagResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const lastUniqueIdRef = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const uniqueId = queryParams.get('uniqueId');

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (uniqueId && uniqueId !== lastUniqueIdRef.current) {
                setIsLoading(true);
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rag`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uniqueId }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setRagResponse(data);
                    setIsLoading(false);
                    lastUniqueIdRef.current = uniqueId;
                })
                .catch(error => {
                    console.error('Failed to fetch RAG response:', error);
                    setIsLoading(false);
                });
            }
        }, 500);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [location.search]);

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h2>
            <div className="grid grid-cols-1 gap-4">
                {/* Transaction Card Container */}
                <div className="bg-white shadow-lg rounded-lg p-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex flex-wrap md:flex-nowrap -mx-4">
                        <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0 relative">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Contacts</h3>
                            <div className="space-y-4">
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                                    </div>
                                ) : (
                                    Object.entries(ragResponse || {}).map(([key, value]) => (
                                        <div key={key} className="flex items-center bg-gray-100 p-3 rounded-lg shadow">
                                            <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
                                                {key.includes('Seller') && <FaUserAlt />}
                                                {key.includes('Agent') && <FaUserTie />}
                                                {key.includes('Broker') && <FaBuilding />}
                                                {key.includes('Home') && <FaHome />}
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
                                {/* Add your property details here */}
                                <p>Details to be defined...</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Additional transaction cards can be added here */}
            </div>
        </div>
    );
}

export default Transactions;