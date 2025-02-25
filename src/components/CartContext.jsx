import { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async (token) => {
    try {
      if (!token) {
        console.error("Token is missing, cannot fetch cart");
        return;
      }

      const response = await axios.get(
        "https://ayurveda-ecommerce.onrender.com/api/user/Allcart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cart Data:", response.data); // Debugging
      setCartItems(response.data.cart || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Fix: Add `updateCart`
  const updateCart = async (productId, quantity, token) => {
    try {
      if (!token) return;
      await axios.put(
        "https://ayurveda-ecommerce.onrender.com/api/user/cart",
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart(token); // Refresh cart
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // ✅ Fix: Add `removeFromCart`
  const removeFromCart = async (productId, token) => {
    try {
      if (!token) return;
      await axios.delete(
        `https://ayurveda-ecommerce.onrender.com/api/user/cart/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart(token); // Refresh cart
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, fetchCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
