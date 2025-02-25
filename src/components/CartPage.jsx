import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import CartItem from "./CartItem";
import AddressModal from "./AddressModal";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const { cartItems, fetchCart, updateCart, removeFromCart } = useContext(CartContext);
  const [token, setToken] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      fetchCart(storedToken);
      fetchAddresses(storedToken);
    }
  }, []);

  // ✅ Fetch Addresses API
  const fetchAddresses = async (token) => {
    try {
      const response = await axios.get("https://ayurveda-ecommerce.onrender.com/api/user/all-Address", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setAddresses(response.data.data);
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error.response?.data || error);
      setAddresses([]);
    }
  };

  // ✅ Extract userId from cartItems
  const userId = cartItems.length > 0 ? cartItems[0].userId : null;

  // ✅ Payment & Order Creation
  const handlePayment = async () => {
    if (!userId || !selectedAddress) {
      alert("User ID or Address is missing!");
      return;
    }
  
    const totalAmount = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0) + 20;
  
    setLoading(true);
    try {
      // ✅ 1. Initiate Razorpay Order with Authorization Header
      const paymentResponse = await axios.post(
        "https://ayurveda-ecommerce.onrender.com/api/user/create-order",
        {
          amount: totalAmount, // ✅ Send actual amount (Backend multiplies by 100)
          currency: "INR",
          receipt: `receipt_ORD${Date.now()}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Include token
        }
      );
  
      console.log("Order Response:", paymentResponse.data);
  
      if (!paymentResponse.data.success || !paymentResponse.data.order) {
        throw new Error("Order creation failed");
      }
  
      const { id, amount, currency } = paymentResponse.data.order; // ✅ Use `id`, not `orderId`
  
      // ✅ 2. Configure Razorpay Options
      const options = {
        key: "rzp_test_C4iXqCXHP8EXL3", // 🔴 Replace with your live key before deploying
        amount, // ✅ Amount already in paisa from backend
        currency,
        name: "Ayurveda Ecommerce",
        description: "Complete your purchase",
        order_id: id, // ✅ Use `id` from Razorpay response
        handler: async function (response) {
          console.log("Payment Success:", response);
  
          // ✅ 3. Verify Payment on Backend
          const verifyResponse = await axios.post(
            "https://ayurveda-ecommerce.onrender.com/api/user/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,  // ✅ Correct key
              razorpay_payment_id: response.razorpay_payment_id,  // ✅ Correct key
              razorpay_signature: response.razorpay_signature,  // ✅ Correct key
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
           
  
          if (verifyResponse.data.success) {
            // ✅ 4. Create Order in Database
            await createOrder(id, response.razorpay_payment_id);
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Test User",
          email: "testuser@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed! Please try again.");
    }
    setLoading(false);
  };
  

  // ✅ Create Order in Database
  const createOrder = async (orderId, paymentId) => {
    const orderData = {
      userId,
      orderId,
      products: cartItems.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        image: item.productId.image || "",
        quantity: item.quantity,
        price: item.productId.price,
      })),
      paymentId,
      payment_status: "Completed",
      delivery_address: selectedAddress,
      subTotalAmt: cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0),
      totalAmt: cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0) + 20,
      invoice_receipt: `invoice_${orderId}.pdf`,
    };
  
    try {
      const response = await axios.post(
        "https://ayurveda-ecommerce.onrender.com/api/user/order",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Include token
        }
      );
  
      if (response.data.success) {
        alert("✅ Order Placed Successfully!");
      } else {
        alert("Order failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again.");
    }
  };
  

  return (
    <div className="p-8 min-h-screen bg-green-50">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem key={item._id} item={item} updateCart={updateCart} removeFromCart={removeFromCart} token={token} />
        ))
      ) : (
        <p className="text-red-500">Your cart is empty.</p>
      )}

      <button onClick={() => setShowAddressModal(true)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Select Address</button>

      {showAddressModal && (
        <AddressModal
          addresses={addresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setShowAddressModal={setShowAddressModal}
          token={token}
          fetchAddresses={fetchAddresses}
        />
      )}

      {selectedAddress && (
        <button
          onClick={handlePayment}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      )}
    </div>
  );
};

export default CartPage;
