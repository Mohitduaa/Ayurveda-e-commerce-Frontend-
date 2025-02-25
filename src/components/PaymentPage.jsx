import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadScript } from "./utils"; // Helper function to load Razorpay script
import QRCode from "qrcode.react";

const PaymentPage = ({ orderData }) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  useEffect(() => {
    if (orderData) {
      initializePayment();
    }
  }, [orderData]);

  const initializePayment = async () => {
    try {
      const response = await axios.post("https://ayurveda-ecommerce.onrender.com/api/user/create-order", orderData);
      
      if (response.data.success) {
        const { amount, currency, orderId } = response.data;
        const options = {
          key: "rzp_test_C4iXqCXHP8EXL3", // Replace with actual Razorpay Key ID
          amount,
          currency,
          name: "Ayurveda Store",
          description: `Order #${orderId}`,
          image: "https://your-logo-url.com/logo.png",
          order_id: orderId,
          handler: async function (response) {
            await handlePaymentSuccess(response);
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: { color: "#3399cc" },
        };
        
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      await axios.post("https://ayurveda-ecommerce.onrender.com/api/user/verify-payment", {
        orderId: orderData.orderId,
        paymentId: response.razorpay_payment_id,
        payment_status: "Completed",
      });
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
      {paymentSuccess ? (
        <p className="text-green-500">Payment Successful! 🎉</p>
      ) : (
        <>
          <p>Scan the QR Code or proceed with Razorpay checkout.</p>
          {paymentUrl && <QRCode value={paymentUrl} size={200} />}
        </>
      )}
    </div>
  );
};

export default PaymentPage;
