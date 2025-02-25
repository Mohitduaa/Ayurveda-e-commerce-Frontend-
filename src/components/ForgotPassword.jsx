import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.put(
        "https://ayurveda-ecommerce.onrender.com/api/user/forgot-password",
        { email }
      );
      setMessage(response.data.message || "OTP sent to your email");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.put(
        "https://ayurveda-ecommerce.onrender.com/api/user/verify-forgot-password-otp",
        { email, otp }
      );
      setMessage(response.data.message || "OTP verified successfully!");
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.put(
        "https://ayurveda-ecommerce.onrender.com/api/user/reset-password",
        { email, newPassword, confirmPassword }
      );
      setMessage(response.data.message || "Password reset successful!");
      setStep(4);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 p-4">
      <form
        onSubmit={step === 1 ? handleRequestOTP : step === 2 ? handleVerifyOTP : handleResetPassword}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {step === 1
            ? "Forgot Password?"
            : step === 2
            ? "Verify OTP"
            : step === 3
            ? "Reset Password"
            : "Password Reset Successful!"}
        </h2>

        <p className="text-gray-600 text-center mb-6">
          {step === 1
            ? "Enter your email to receive an OTP."
            : step === 2
            ? "Enter the OTP sent to your email."
            : step === 3
            ? "Enter your new password."
            : "You can now login with your new password!"}
        </p>

        {message && <p className="text-center text-sm text-red-500">{message}</p>}

        <div className="space-y-4">
          {(step === 1 || step === 2 || step === 3) && (
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
              disabled={step !== 1}
            />
          )}

          {step === 2 && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </>
          )}
        </div>

        {step < 4 && (
          <button
            type="submit"
            className="w-full mt-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-500 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : step === 1
              ? "Request OTP"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"}
          </button>
        )}

        <div className="text-gray-600 text-sm text-center mt-4">
          {step !== 4 ? (
            <p>
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-green-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          ) : (
            <Link
              to="/login"
              className="text-green-500 font-semibold hover:underline"
            >
              Click here to Login
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
