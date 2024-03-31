import React from 'react';

// Sample transactions data
const transactions = [
    { id: 1, date: '2023-04-01', type: 'Deposit', amount: '$1,000', status: 'Completed' },
    { id: 2, date: '2023-04-03', type: 'Withdrawal', amount: '$200', status: 'Pending' },
    { id: 3, date: '2023-04-05', type: 'Payment', amount: '$150', status: 'Completed' },
    { id: 4, date: '2023-04-07', type: 'Deposit', amount: '$2,500', status: 'Failed' },
];

function Transactions() {
    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-left">Type</th>
                            <th className="py-3 px-6 text-right">Amount</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{transaction.date}</td>
                                <td className="py-3 px-6 text-left">{transaction.type}</td>
                                <td className="py-3 px-6 text-right">{transaction.amount}</td>
                                <td className="py-3 px-6 text-center">
                                    <span className={`py-1 px-3 rounded-full text-xs ${transaction.status === 'Completed' ? 'bg-green-200 text-green-600' : transaction.status === 'Pending' ? 'bg-yellow-200 text-yellow-600' : 'bg-red-200 text-red-600'}`}>
                                        {transaction.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transactions;