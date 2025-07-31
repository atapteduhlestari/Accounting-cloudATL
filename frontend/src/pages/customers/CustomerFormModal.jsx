import React from 'react';
import CustomerForm from './CustomerForm';

const CustomerFormModal = ({ open, onClose, customerId, onSuccess }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-[95%] max-w-5xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
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
        <CustomerForm
          id={customerId}
          onSuccess={() => {
            onClose();
            onSuccess();
          }}
        />
      </div>
    </div>
  );
};

export default CustomerFormModal;
