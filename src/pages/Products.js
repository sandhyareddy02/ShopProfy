import React, { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";

const Products = () => {
  const { products } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((item) => {
    if (selectedCategory === "All") {
      return true;
    } else if (selectedCategory === "men's clothing") {
      return item.category === "men's clothing";
    } else if (selectedCategory === "women's clothing") {
      return item.category === "women's clothing";
    } else if (selectedCategory === "jewelery") {
      return item.category === "jewelery";
    } else if (selectedCategory === "electronics") {
      return item.category === "electronics";
    }
    return false;
  });

  return (
    <div>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
          <div className="flex justify-center space-x-4 mb-10">
            <button 
              className={`px-4 py-2 rounded ${selectedCategory === "All" ? "bg-pink-300 text-white" : "bg-white text-pink-500 border border-pink-300"}`}
              onClick={() => handleCategoryChange("All")}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded ${selectedCategory === "men's clothing" ? "bg-pink-300 text-white" : "bg-white text-pink-500 border border-pink-300"}`}
              onClick={() => handleCategoryChange("men's clothing")}
            >
              Men's Clothing
            </button>
            <button 
              className={`px-4 py-2 rounded ${selectedCategory === "women's clothing" ? "bg-pink-300 text-white" : "bg-white text-pink-500 border border-pink-300"}`}
              onClick={() => handleCategoryChange("women's clothing")}
            >
              Women's Clothing
            </button>
            <button 
              className={`px-4 py-2 rounded ${selectedCategory === "jewelery" ? "bg-pink-300 text-white" : "bg-white text-pink-500 border border-pink-300"}`}
              onClick={() => handleCategoryChange("jewelery")}
            >
              Jewelry
            </button>
            <button 
              className={`px-4 py-2 rounded ${selectedCategory === "electronics" ? "bg-pink-300 text-white" : "bg-white text-pink-500 border border-pink-300"}`}
              onClick={() => handleCategoryChange("electronics")}
            >
              Electronics
            </button>
          </div>

          <hr className="my-12" /> 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[40px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
