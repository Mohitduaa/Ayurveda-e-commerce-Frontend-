import React, { useEffect, useState , useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { useLocation } from "react-router-dom";



const Products = ({ product}) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
      const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://ayurveda-ecommerce.onrender.com/api/user/all-products"
        );
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-green-100 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
          key={product._id} onClick={() => navigate(`/product/${product._id}`)}
            className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-md"
            />
            <div className="flex-1 flex flex-col">
              <h3 className="text-start text-base font-semibold mt-4 min-h-[48px] text-gray-900">
                {product.name}
              </h3>
              <p className="text-start text-gray-600 text-sm  flex-grow line-clamp-2 min-h-[40px]">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-bold text-green-600">₹{product.price}</p>
                {/* {product.discount && (
                  <span className="text-sm text-red-500 line-through">₹{product.discount}</span>
                )} */}
              </div>
              <button   className="bg-green-500 text-white px-4 py-2 rounded-md">
              Add to Cart
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
