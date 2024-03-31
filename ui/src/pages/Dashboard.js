import React, { useState } from 'react';
import { FaRegMoneyBillAlt, FaRegHandshake, FaEnvelopeOpenText, FaPlus } from 'react-icons/fa';
import TransactionModal from '../components/TransactionModal';

function Dashboard() {
    // Initial transactions data with additional samples
    const transactions = [
        { id: 1, type: 'Sale', client: 'John Doe', amount: '$250,000', status: 'Completed' },
        { id: 2, type: 'Sale', client: 'Jane Smith', amount: '$180,000', status: 'Completed' },
        { id: 3, type: 'Purchase', client: 'Michael Brown', amount: '$1,200/month', status: 'In Progress' },
        { id: 4, type: 'Purchase', client: 'Alice Johnson', amount: '$300,000', status: 'In Progress' },
        { id: 5, type: 'Lease', client: 'Tom Hanks', amount: '$950/month', status: 'Pending' },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to select icon based on transaction type
    const getIcon = (type) => {
        switch (type) {
            case 'Sale':
                return <FaRegMoneyBillAlt className="text-green-500 mr-2" />;
            case 'Purchase':
                return <FaRegHandshake className="text-blue-500 mr-2" />;
            case 'Lease':
                return <FaEnvelopeOpenText className="text-yellow-500 mr-2" />;
            default:
                return null;
        }
    };

    const addNewTransaction = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-800">Active Transactions</h3>
                    <p className="text-lg text-gray-600 mt-2">42</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-800">Pending Transactions</h3>
                    <p className="text-lg text-gray-600 mt-2">17</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-semibold text-gray-800">New Messages</h3>
                    <p className="text-lg text-gray-600 mt-2">5</p>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800">Recent Transactions</h3>
                <button onClick={addNewTransaction} className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <FaPlus className="inline mr-2" />Add New Transaction
                </button>
                <div className="mt-4">
                    {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center bg-white rounded-lg shadow p-4 mb-4">
                            {getIcon(transaction.type)}
                            <div className="flex-grow">
                                <h4 className="text-xl font-semibold text-gray-800">{transaction.client || 'New Transaction'} - {transaction.type || 'N/A'}</h4>
                                <p className="text-gray-600">{transaction.amount || 'N/A'}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : transaction.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                {transaction.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Dashboard;