import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionCard from '../components/TransactionCard';

const Transactions = () => {
    const [ragResponse, setRagResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedTransactionId, setExpandedTransactionId] = useState(null);
    const location = useLocation();
    const lastUniqueIdRef = useRef(null);
    const debounceRef = useRef(null);

    // Static data for prepopulated transactions
    const staticTransactions = [
        { id: 1, address: "123 Maple Street", Seller: "Alex Johnson", "Listing Agent": "Samantha Right", "Listing Broker": "Keller Williams Realty", Buyer: "Jordan Smith", "Buyer's Agent": "Michael Brown", "Buyer's Broker": "Coldwell Banker" },
        { id: 2, address: "456 Oak Avenue", Seller: "Emily Turner", "Listing Agent": "Lucas Graham", "Listing Broker": "Century 21", Buyer: "Olivia King", "Buyer's Agent": "Sophia Carter", "Buyer's Broker": "RE/MAX" },
        { id: 3, address: "789 Pine Road", Seller: "William Davis", "Listing Agent": "Emma Wilson", "Listing Broker": "Berkshire Hathaway", Buyer: "Mason Miller", "Buyer's Agent": "Isabella Garcia", "Buyer's Broker": "Sotheby's International Realty" },
        { id: 4, address: "1011 Birch Lane", Seller: "Ava Moore", "Listing Agent": "Ethan Taylor", "Listing Broker": "Redfin", Buyer: "Isabella Garcia", "Buyer's Agent": "Noah Anderson", "Buyer's Broker": "Compass" },
        { id: 5, address: "1213 Cedar Court", Seller: "Sophia Carter", "Listing Agent": "Oliver Martinez", "Listing Broker": "eXp Realty", Buyer: "Mia Hernandez", "Buyer's Agent": "Charlotte Gonzalez", "Buyer's Broker": "The Agency" },
    ];

    const toggleTransaction = (id) => {
        setExpandedTransactionId(expandedTransactionId === id ? null : id);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const uniqueId = queryParams.get('uniqueId');

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (uniqueId && uniqueId !== lastUniqueIdRef.current) {
                setIsLoading(true);
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/rag/static`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uniqueId }),
                })
                .then(response => response.json())
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

        return () => clearTimeout(debounceRef.current);
    }, [location.search]);

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h2>
            <div className="grid grid-cols-1 gap-4">
                {ragResponse && <TransactionCard isLoading={isLoading} ragResponse={ragResponse} />}
                {staticTransactions.map(transaction => {
                    const isExpanded = expandedTransactionId === transaction.id;
                    return isExpanded ? (
                        // Render the TransactionCard directly without additional wrapping when expanded
                        <TransactionCard key={transaction.id} isLoading={false} ragResponse={transaction} />
                    ) : (
                        // Render the summary view with an option to expand
                        <div key={transaction.id} className="border p-4 bg-white shadow-lg rounded-lg cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl" onClick={() => toggleTransaction(transaction.id)}>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold">{transaction.address}</span>
                                <span>▼</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Transactions;