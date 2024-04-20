import React, { useState, useEffect, useCallback } from 'react';
import { FaBuilding, FaPhone, FaEnvelope, FaUserTie, FaHome, FaPlusCircle, FaTrash, FaTimes, FaRegMoneyBillAlt } from 'react-icons/fa';
import TaskList from './TaskList';

const TransactionCard = ({ isLoading, transactionDetails, expanded, toggleTransaction, onDelete}) => {
    const baseClass = "border bg-white shadow-lg rounded-lg transition-all duration-1000 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl";
    const expandedClass = expanded ? "max-h-screen p-6" : "max-h-24 p-4";
    const pointerClass = "cursor-pointer";
    const [contentOpacity, setContentOpacity] = useState(0);
    const [contacts, setContacts] = useState([]);

    const sampleTasks = [
        { id: 1, title: "Contract Date", completed: true, date: "2/5/2024" },
        { id: 2, title: "MUTUAL ACCEPTANCE (form 28)", completed: true, date: "2/6/2024" },
        { id: 3, title: "Seller’s Deadline to Deliver Utility Information (form 22K)", completed: true, date: "Satisfied" },
        { id: 4, title: "Seller’s Deadline to Deliver the FIRPTA Certification via Form 22E to Closing Agent (form 28, par. j.)", completed: true, date: "Satisfied" },
        { id: 5, title: "Buyer’s Home Inspection Contingency (form 35, par. 3)", completed: true, date: "Satisfied" },
        { id: 6, title: "Buyer’s Right to Revoke Offer Based-On Seller Disclosure (form 17)", completed: true, date: "Waived" },
        { id: 7, title: "Buyer’s Deadline to Deliver Earnest Money to Closing Agent (form 28, par. b.)", completed: false, date: "2/9/2024" },
        { id: 8, title: "Buyer’s Information Verification Period Deadline (form 28, par. w.)", completed: false, date: "2/12/2024" },
    ];

    const fetchContacts = useCallback(async () => {
        try {
            const contactDetails = await Promise.all(
                transactionDetails.Contacts.map(async (id) => {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch contact');
                    }
                    return response.json();
                })
            );
            console.log(contactDetails);
            setContacts(contactDetails);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }, [transactionDetails.Contacts]); // Assuming transactionDetails.Contacts is stable or memoized elsewhere

    useEffect(() => {
        let fadeTimeout;
        if (expanded) {
            fadeTimeout = setTimeout(() => setContentOpacity(1), 1000);
            fetchContacts();
        } else {
            setContentOpacity(0);
        }
        return () => clearTimeout(fadeTimeout);
    }, [expanded, fetchContacts]); // Now includes fetchContacts

    if (!expanded) {
        return (
            <div className={`${baseClass} ${expandedClass} ${pointerClass}`} onClick={toggleTransaction}>
                <div className="flex justify-between items-center">
                    <div className="flex" style={{ minWidth: '90%' }}>
                        <div className="flex items-center mr-2">
                            <FaRegMoneyBillAlt className="text-green-500 text-3xl" />
                        </div>
                        <div>
                            <span className="text-xl font-bold">{transactionDetails.Address}</span>
                            <span className="block text-sm text-gray-500 ml-2">MLS #2196746: Issaquah, WA 98027</span>
                            <span className="block text-sm text-gray-500 ml-2">Purchase Price: {transactionDetails.PurchasePrice}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">In Progress</span>
                    </div>
                    <FaTrash className="cursor-pointer text-red-500" onClick={(e) => { e.stopPropagation(); onDelete(transactionDetails._id); }} />
                </div>
            </div>
        );
    }

    return (
        <div className={`${baseClass} ${expandedClass} ${pointerClass}`}>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-lg">
                <div className="flex flex-col justify-start">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{transactionDetails.Address}</h3>
                    <span className="text-lg text-gray-600">MLS #2196746: Issaquah, WA 98027</span>
                    <span className="text-lg font-semibold text-indigo-600">Purchase Price: {transactionDetails.PurchasePrice}</span>
                </div>
                <div className="flex flex-col justify-start">
                    <span className="text-lg text-gray-600">Closing Date: 03/01/2024</span>
                    <span className="text-lg font-semibold text-green-600">Buyer: {transactionDetails.Buyer}</span>
                    <span className="text-lg font-semibold text-red-600">Seller: {transactionDetails.Seller}</span>
                </div>
                <FaTimes className="text-3xl text-red-500 cursor-pointer hover:text-red-700" onClick={toggleTransaction} />
            </div>
            <div className="flex flex-wrap md:flex-nowrap -mx-4 mt-6" style={{ opacity: contentOpacity, transition: 'opacity 200ms ease-in-out' }}>
                <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0 relative">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Contacts</h3>
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                        ) : (
                            contacts.map((contact, index) => (
                                <div key={contact._id} className="flex items-center bg-gray-100 p-3 rounded-lg shadow" style={{ opacity: contentOpacity, transition: `opacity 500ms ease-in-out ${index * 100}ms` }}>
                                    <div className="p-3 rounded-full bg-purple-500 text-white mr-4">
                                        {contact.role === 'Buyer Broker' && <FaUserTie />}
                                        {contact.role === 'Transaction Coordinator' && <FaUserTie />}
                                        {contact.role === 'Listing Broker' && <FaUserTie />}
                                        {contact.role === 'Escrow' && <FaBuilding />}
                                        {contact.role === "Title" && <FaBuilding />}
                                        {contact.role === "Lender" && <FaBuilding />}
                                        {contact.role === "HOA" && <FaHome />}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-bold">{contact.name}</p>
                                        <p>{contact.role}</p>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <div className="flex items-center text-sm text-gray-600 mb-1">
                                            <FaEnvelope className="inline mr-2" />
                                            <span className="mr-2">{contact.email ? contact.email : 'Add email'}</span>
                                            <FaPlusCircle className="cursor-pointer text-green-500" />
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaPhone className="inline mr-2" />
                                            <span className="mr-2">{contact.phone ? contact.phone : 'Add phone'}</span>
                                            <FaPlusCircle className="cursor-pointer text-green-500" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Transaction Task List</h3>
                    <TaskList tasks={sampleTasks} onToggleComplete={(id) => {
                        // Here you would handle the toggle logic, possibly updating state or making an API call
                        console.log(`Toggled task ${id}`);
                    }} />
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;

