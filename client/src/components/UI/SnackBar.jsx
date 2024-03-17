import React from 'react';

const Snackbar = ({ open, message, severity, onClose }) => {
    const getColor = () => {
        switch (severity) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div
            className={`fixed top-0  right-0 mb-4 mx-auto w-80 p-4 rounded-md shadow-md text-white ${getColor()} transition-opacity duration-300 ${
                open ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div>{message}</div>
            <button
                className="absolute top-0 right-0 mr-4 mt-3 text-white focus:outline-none"
                onClick={onClose}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Snackbar;
