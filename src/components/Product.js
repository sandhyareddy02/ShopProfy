import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, image, category, title, price } = product;

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt={title}
            />
          </div>
        </div>
      </div>
      <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
      <Link to={`/product/${id}`}>
        <h2 className="font-semibold mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h2>
      </Link>
      <h2 className="font-semibold mb-1">$ {price}</h2>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => addToCart(product, id)}
          className="py-2 px-4 bg-teal-500 text-white font-medium rounded hover:bg-teal-600 transition"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${id}`}
          className="py-2 px-4 bg-gray-300 text-black font-medium rounded hover:bg-gray-400 transition flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEye} />
        </Link>
      </div>
    </div>
  );
};

export default Product;
