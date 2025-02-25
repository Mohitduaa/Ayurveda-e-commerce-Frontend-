import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ayurveda-ecommerce.onrender.com/api/user/login",
        formData
      );
      const token = res.data.data?.accesstoken; // Correct key from API response
  
      if (token) {
        localStorage.setItem("authToken", token);
        alert("Login Successful");
        navigate("/Products");
      } else {
        alert("Token missing in response!");
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Failed to Login"));
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Login to access your account.
        </p>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-transform transform hover:scale-105"
        >
          Login
        </button>
        <div className="text-gray-600 text-sm text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-green-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="text-green-500 font-semibold hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
