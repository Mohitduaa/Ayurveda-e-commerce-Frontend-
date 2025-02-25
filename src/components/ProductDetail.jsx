import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // 👈 React Router ka hook

  // Fetch Token from Local Storage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
console.log("Token before API call:", token);
    setToken(token || "");
  }, []);
  

  // Fetch Product Data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ayurveda-ecommerce.onrender.com/api/user/product-by-id/${id}`
        );
        setProduct(response.data.data || response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error.response || error.message);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Add to Cart Function
  const addToCart = async (productId, quantity) => {
    console.log("Token before API call:", token); // Debugging Token

    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch("https://ayurveda-ecommerce.onrender.com/api/user/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      console.log("Cart API Response:", data); // Debugging API Response

      if (!response.ok) throw new Error(data.message);

      navigate("/cart"); 
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      alert(error.message);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  
  const subtotal =  product.price * quantity;

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="max-w-6xl  grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow-lg">
        
        {/* Left Side: Product Image */}
        <div className="relative w-full bg-white h-[400px] flex items-center justify-center rounded-lg shadow-md border border-green-300">
          <div className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1 rounded-md">
            -10%
          </div>
          {product.image ? (
            <img
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-gray-500 flex flex-col items-center">
              <span className="text-2xl">📷</span>
              <p>No Image Available</p>
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full">
          <h1 className="text-2xl text-start font-bold text-green-700">{product.name}</h1>
          <div className="mt-4">
          <p className="text-green-600 text-start text-xl">₹{product.price}</p>
            
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <p className="text-lg font-semibold">Quantity:</p>
            <div className="flex items-center border border-green-400 rounded-lg">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 text-lg border-r border-green-400"
              >
                -
              </button>
              <span className="px-6 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 py-2 text-lg border-l border-green-400"
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal */}

          <p className="text-start mt-2 text-lg font-semibold text-green-700">Subtotal: ₹{subtotal}</p>
          {/* Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => addToCart(product._id, quantity)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md"
            >
              <FaShoppingCart /> ADD TO CART
            </button>
            
          </div>
          <p className="text-start text-gray-600 text-base flex-grow  mt-4">
                {product.description}
              </p>
          {/* Offers Section */}
          <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300">
            <p className="text-lg font-semibold text-green-700">Available Offers</p>
            <ul className="mt-2 space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Additional 5% discounts on all orders of ₹600+
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Flat 25% discount on selected combos
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                Free Shipping on orders above ₹500
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
