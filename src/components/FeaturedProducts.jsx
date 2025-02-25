import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://ayurveda-ecommerce.onrender.com/api/user/all-products");
        const result = await response.json();

        if (result.success) {
          setProducts(result.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="py-10 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Featured Products</h2>

      {/* 🛠 Horizontal Scroll Container */}
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto scroll-smooth snap-x scrollbar-hide">
          <div className="flex gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="bg-white shadow-md rounded-lg p-4 min-w-[250px] md:min-w-[300px] snap-start"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg text-start font-semibold mt-2">{product.name}</h3>
                <p className="text-green-600 text-start font-bold mt-2">₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🛍 "Shop All Products" Button */}
      <Link to="/Products">
      <div className="text-center mt-8">
        <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
          Shop All Products
        </button>
      </div>
      </Link>
    </div>
  );
};

export default FeaturedProducts;
