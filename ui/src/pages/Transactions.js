import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionCard from '../components/TransactionCard';
import TransactionModal from '../components/TransactionModal';
import { FaPlus } from 'react-icons/fa';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedTransactionId, setExpandedTransactionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const lastUniqueIdRef = useRef(null);
    const debounceRef = useRef(null);

    const toggleTransaction = (id) => {
        setExpandedTransactionId(expandedTransactionId === id ? null : id);
    };

    const addNewTransaction = () => { // Function to toggle modal visibility
        setIsModalOpen(true);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/transactions`)
            .then(response => response.json())
            .then(data => {
                setTransactions(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch transactions:', error);
                setIsLoading(false);
            });

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
                    setTransactions(prev => [data, ...prev]);
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
            <button onClick={addNewTransaction} className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <FaPlus className="inline mr-2" />Add New Transaction
            </button>
            <div className="grid grid-cols-1 gap-4">
                {transactions.map(transaction => (
                    <TransactionCard key={transaction.id || transaction._id} isLoading={isLoading} ragResponse={transaction} expanded={expandedTransactionId === transaction.id || expandedTransactionId === transaction._id} toggleTransaction={() => toggleTransaction(transaction.id || transaction._id)} />
                ))}
            </div>
            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Transactions;