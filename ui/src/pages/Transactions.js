import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import TransactionCard from '../components/TransactionCard';
import TransactionModal from '../components/TransactionModal';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import LoadingModal from '../components/LoadingModal';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [expandedTransactionId, setExpandedTransactionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const lastUniqueIdRef = useRef(null);
    const debounceRef = useRef(null);
    const initialCompletenes = {
        "DISCLOSURE REGARDING REAL ESTATE AGENCY RELATIONSHIP": "incomplete",
        "FAIR HOUSING AND DISCRIMINATION ADVISORY": "incomplete",
        "POSSIBLE REPRESENTATION OF MORE THAN ONE BUYER OR SELLER": "incomplete",
        "WIRE FRAUD AND TRANSFER ELECTRONIC FUNDS TRANSFER ADVISORY": "incomplete",
        "BUYER HOMEOWNERS’ INSURANCE ADVISORY": "incomplete",
        "CALIFORNIA RESIDENTIAL PURCHASE AGREEMENT AND JOINT ESCROW INSTRUCTIONS": "incomplete",
        "BUYER’S INVESTIGATION ADVISORY": "incomplete",
        "FAIR APPRAISAL ACT ADDENDUM": "incomplete",
        "CALIFORNIA CONSUMER PRIVACY ACT ADVISORY, DISCLOSURE AND NOTICE": "incomplete",
      };

    const toggleTransaction = (id) => {
        setExpandedTransactionId(expandedTransactionId === id ? null : id);
    };

    const openAddTransactionModal = () => {
        setIsModalOpen(true);
    };

    const deleteTransaction = async (id) => {
        console.log('Deleting transaction with ID:', id);
        const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/transactions/${id}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                // Remove the deleted transaction from the state
                setTransactions(transactions.filter(transaction => transaction._id !== id));
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Failed to delete transaction:', error);
        }
    };

    const addTransaction = async (uniqueId) => {
        setIsLoading2(true);
        try {
            const validationDetails = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/documents/validate-all-static`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uniqueId }),
            });

            if(validationDetails.status === 200){
                const transactionDetials = await validationDetails.json();
                console.log(transactionDetials);
                Object.keys(transactionDetials.results).forEach((page) => {
                    if (initialCompletenes.hasOwnProperty(transactionDetials.results[page].title)) {
                        // Update the value of the key in the initial object with the value from the new object
                        initialCompletenes[transactionDetials.results[page].title] = transactionDetials.results[page].determination;
                      }
                })
                console.log(initialCompletenes)
                const saveResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/transactions/extract-data-static`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({uniqueId}),
                });
                setIsLoading2(false);

                if (saveResponse.ok) {
                    const savedTransaction = await saveResponse.json();
                    setIsLoading(true);
                    setTransactions(prev => [savedTransaction, ...prev]);
                    setExpandedTransactionId(savedTransaction._id);
                } else {
                    alert('Failed to get response');
                }
            }

            lastUniqueIdRef.current = uniqueId;
        } catch (error) {
            console.error('Failed to add transaction to the database:', error);
            setIsLoading(false);
        }
    };

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/transactions`);
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // On page load, fetch transactions
        fetchTransactions();

        // Check if adding a new transaction with uniqueId query parameter
        const queryParams = new URLSearchParams(location.search);
        const uniqueId = queryParams.get('uniqueId');

        // add new transaction with debounding
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(async () => {
            if (uniqueId && uniqueId !== lastUniqueIdRef.current) {
                await addTransaction("66240b851f6ad7b4069273be"); // Add transaction with uniqueId
            }
        }, 500);

        return () => clearTimeout(debounceRef.current);
    }, [location.search]);

    return (
        <>
            {
                (isLoading || isLoading2) && <LoadingModal title={"testing"} show={true} initialCompletenes={initialCompletenes} setIsLoading={setIsLoading} isLoading2={isLoading2}/>
            }
            <div className="p-10">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800">Active Transactions</h3>
                        <p className="text-lg text-gray-600 mt-2">{transactions.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800">Pending Transactions</h3>
                        <p className="text-lg text-gray-600 mt-2">2</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-semibold text-gray-800">Completed Transactions</h3>
                        <p className="text-lg text-gray-600 mt-2">19</p>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex justify-between items-center mt-8 mb-4">
                        <h3 className="text-3xl font-bold text-gray-800">Transactions</h3>
                        <button onClick={openAddTransactionModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <FaPlus className="inline mr-2" />Add New Transaction
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {transactions.map(transaction => (
                            <TransactionCard
                                key={transaction._id} 
                                isLoading={isLoading} 
                                transactionDetails={transaction} 
                                expanded={expandedTransactionId === transaction._id} 
                                toggleTransaction={() => toggleTransaction(transaction._id)} 
                                onDelete={deleteTransaction} 
                            />
                        ))}
                    </div>
                </div>
                <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </>
    );
}

export default Transactions;