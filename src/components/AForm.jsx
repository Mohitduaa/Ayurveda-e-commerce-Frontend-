import React, { useState } from "react";
import axios from "axios";

const AForm = ({ token, fetchAddresses, setShowForm }) => {
  const [newAddress, setNewAddress] = useState({
    name: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    mobile: "",
    type: "home", // Default type
  });

  const handleAddAddress = async () => {
    try {
      await axios.post("https://ayurveda-ecommerce.onrender.com/api/user/create-Address", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses(token);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Name" 
        className="border p-2 w-full" 
        value={newAddress.name} 
        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Address Line" 
        className="border p-2 w-full" 
        value={newAddress.address_line} 
        onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="City" 
        className="border p-2 w-full" 
        value={newAddress.city} 
        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="State" 
        className="border p-2 w-full" 
        value={newAddress.state} 
        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Pincode" 
        className="border p-2 w-full" 
        value={newAddress.pincode} 
        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Mobile" 
        className="border p-2 w-full" 
        value={newAddress.mobile} 
        onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })} 
      />

      <label className="block mt-2">Address Type:</label>
      <select 
        className="border p-2 w-full" 
        value={newAddress.type} 
        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
      >
        <option value="home">Home</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>

      <button onClick={handleAddAddress} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Add Address
      </button>
    </div>
  );
};

export default AForm;
