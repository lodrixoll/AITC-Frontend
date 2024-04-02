import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

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
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            ) : ragResponse ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Contacts</h3>
                        <ul>
                            {Object.entries(ragResponse).map(([key, value]) => (
                                <li key={key} className="mb-2"><strong>{key.replace(/_/g, ' ')}:</strong> {value}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Property Details</h3>
                        {/* Add your property details here */}
                        <p>Details to be defined...</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Transactions;