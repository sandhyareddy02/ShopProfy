import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag } from "react-icons/bs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './LoginModal'; // Import the modal component
import ContactModal from './ContactModal'; // Import the contact modal component
import AboutModal from './AboutModal'; // Import the about modal component

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // Modal state
  const [isContactModalOpen, setContactModalOpen] = useState(false); // Contact modal state
  const [isAboutModalOpen, setAboutModalOpen] = useState(false); // About modal state
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // event listener
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup listener
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img src={Logo} alt="ShopProfy Logo" className="w-[40px]" />
            <h2 className="text-xl font-bold">ShopProfy</h2>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-4">
          <Link to={"/"} className="text-me font-medium hover:underline">Home</Link>
          <Link to={"/products"} className="text-me font-medium hover:underline">Products</Link>
          <button
            onClick={() => setAboutModalOpen(true)}
            className="text-me font-medium hover:underline"
          >
            About
          </button>
          <button
            onClick={() => setContactModalOpen(true)}
            className="text-me font-medium hover:underline"
          >
            Contact
          </button>
        </nav>

        {/* Login and Cart */}
        <div className="flex items-center gap-4">
          {/* Login Button */}
          <button
            onClick={() => setLoginModalOpen(true)}
            className="flex items-center text-me font-medium hover:underline"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="text-xl" />
            <span className="ml-2">Login</span>
          </button>

          {/* Cart */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>

      {/* Render the modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </header>
  );
};

export default Header;
