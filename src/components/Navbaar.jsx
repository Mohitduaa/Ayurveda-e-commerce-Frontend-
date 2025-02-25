import { useState, useContext, useEffect } from "react";
import { FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { Leaf } from "lucide-react";

const Navbaar = () => {
  const { cartItems, fetchCart } = useContext(CartContext);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // 🔹 Check if user is logged in and get name from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, [fetchCart]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Remove user data on logout
    setUserName(null);
  };

  return (
    <>
      <div className="bg-green-600 text-white text-center py-2 text-sm">
        Free shipping on orders above ₹999 | Same day dispatch on orders before 2 PM
      </div>
      <nav className="bg-white shadow-md p-4 px-10 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" >
        <div className="flex items-center gap-2">
          {/* <span className="text-2xl text-green-600">&#127810;</span> */}
          <Leaf className="text-green-600 text-2xl"/>
          <span className="text-green-600 text-2xl font-bold">Aayurveda</span>
        </div>
        </Link>

        {/* Search Bar */}
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          {/* <FaHeart className="text-gray-600 cursor-pointer" /> */}
          <Link to="/cart" className="relative">
            <button className="relative">
              🛒
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-5 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>

          {/* 🔹 Show Username if Logged In, Otherwise Show Login Button */}
          {userName ? (
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-semibold">{userName}</span>
              <button onClick={handleLogout} className="text-red-500 font-semibold">
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <FaUser /> Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbaar;
