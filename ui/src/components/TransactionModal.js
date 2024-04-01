import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TransactionModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setUploading(true);
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload`, {
            method: 'POST',
            body: formData,
            // No need to set Content-Type in fetch with FormData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Assuming the server responds with JSON
        })
        .then(() => {
            setUploading(false);
            onClose();
            navigate('/transactions');
        })
        .catch(() => {
            setUploading(false);
            // Handle error (e.g., show an error message)
        });
    }, [navigate, onClose]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'application/pdf',
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full" onClick={onClose}>
            <div className="relative top-10 mx-auto p-8 border w-1/2 shadow-2xl rounded-lg bg-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105" onClick={e => e.stopPropagation()}>
                <div className="mt-3 text-center">
                    <FaFilePdf className="mx-auto text-red-500 text-6xl" />
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">New Transaction</h3>
                    <div className="mt-2">
                        <div {...getRootProps({ className: 'dropzone' })} className="border-dashed border-4 border-gray-300 rounded-lg p-4">
                            <input {...getInputProps()} />
                            <p className="text-gray-600">Add Purchase Agreement PDF</p>
                            {uploading && <p>Uploading...</p>}
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