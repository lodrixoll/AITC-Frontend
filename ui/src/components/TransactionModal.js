import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TransactionModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Define the onDrop function
    const onDrop = useCallback(acceptedFiles => {
        // Assuming the upload process is here and is successful
        onClose(); // Close the modal
        navigate('/transactions'); // Navigate to the transactions page
    }, [navigate, onClose]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'application/pdf', // Accept only PDF files
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full" onClick={onClose}>
            <div className="relative top-10 mx-auto p-8 border w-1/2 shadow-2xl rounded-lg bg-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105" onClick={e => e.stopPropagation()}>
                <div className="mt-3 text-center">
                    <FaFilePdf className="mx-auto text-red-500 text-6xl" />
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">Upload Transaction PDF</h3>
                    <div className="mt-2">
                        <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-4 border-gray-300 rounded-lg p-4">
                            <input {...getInputProps()} />
                            <p className="text-gray-600">Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button id="ok-btn" onClick={onClose} className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;