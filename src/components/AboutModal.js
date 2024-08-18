import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white p-8 rounded shadow-lg z-10 w-96">
                <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2 className="text-2xl font-bold mb-4">About Us</h2>
                <p>Welcome to Shopprofy!
                    At Shopprofy, we’re passionate about bringing you the best in fashion, jewelry, and electronics. Our mission is to offer an exceptional shopping experience with a diverse range of products to suit your every need.

                    Our Story
                    Founded with a vision to revolutionize online shopping, Shopprofy combines quality, affordability, and convenience. From stylish men's and women's clothing to exquisite jewelry and cutting-edge electronics, we curate our selection to ensure you find the perfect items to enhance your lifestyle.

                    Thank you for choosing Shopprofy. Happy shopping!</p>
            </div>
        </div>
    );
};

export default AboutModal;
