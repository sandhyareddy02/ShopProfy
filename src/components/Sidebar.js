import React, { useContext, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const [discountType, setDiscountType] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emptyCartError, setEmptyCartError] = useState(false);
  const fixedDiscount = 10;
  const percentageDiscount = 0.1;

  const calculateDiscount = () => {
    if (total < 20) {
      return 0;
    }
    if (discountType === "fixed") {
      return fixedDiscount;
    } else if (discountType === "percentage") {
      return total * percentageDiscount;
    }
    return 0;
  };

  const handleDiscountChange = (type) => {
    if (total < 20) {
      setShowError(true);
    } else {
      setDiscountType(type);
      setShowError(false);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setEmptyCartError(true);
    } else if (total < 20) {
      setShowError(true);
    } else {
      setShowSuccess(true);
      clearCart(); 
    }
  };

  const discountAmount = calculateDiscount();
  const finalTotal = total - discountAmount;

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px] flex flex-col`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
          {cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
        <div className="flex flex-col gap-y-3 mt-4">
          <div>
            <h3 className="font-semibold mb-2">Apply Discount</h3>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="discount"
                value="fixed"
                id="fixed-discount"
                onChange={() => handleDiscountChange("fixed")}
                checked={discountType === "fixed"}
              />
              <label htmlFor="fixed-discount" className="ml-2">
                $10 off
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="discount"
                value="percentage"
                id="percentage-discount"
                onChange={() => handleDiscountChange("percentage")}
                checked={discountType === "percentage"}
              />
              <label htmlFor="percentage-discount" className="ml-2">
                10% off
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex w-full justify-between items-center">
              <div className="font-semibold flex items-center gap-2">
                <span className="text-black">Subtotal:</span>
                <span className={`ml-2 ${discountAmount > 0 ? 'text-gray-500 line-through' : ''}`}>
                  ${total.toFixed(2)}
                </span>
                {discountAmount > 0 && (
                  <span className="text-red-500 ml-2">${finalTotal.toFixed(2)}</span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 mt-4">
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-full flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
          <button
            onClick={handleCheckout}
            className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
          >
            Checkout
          </button>
        </div>
      </div>
      {showError && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Error</h3>
            <p>Cart value must be more than $20 to apply a discount.</p>
            <button
              onClick={() => setShowError(false)}
              className="mt-4 bg-primary text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSuccess && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Success</h3>
            <p>Successfully, your order is placed! Thanks for ordering with us!</p>
            <button
              onClick={() => {
                setShowSuccess(false);
                clearCart(); 
              }}
              className="mt-4 bg-primary text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {emptyCartError && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Error</h3>
            <p>Please, add at least 1 item to the cart.</p>
            <button
              onClick={() => setEmptyCartError(false)}
              className="mt-4 bg-primary text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
