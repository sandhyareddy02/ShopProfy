import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-8 rounded shadow-lg z-10 w-96">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg">
          If you are facing any issues regarding placing the order, please contact us through 
          <a href="mailto:shopprofy@shop.com" className="text-blue-500 underline"> shopprofy@shop.com</a>.
        </p>
      </div>
    </div>
  );
};

export default ContactModal;
