import React, { useState } from "react";
import AForm from "./AForm";  // Import Address Form

const AddressModal = ({ addresses, selectedAddress, setSelectedAddress, setShowAddressModal, token, fetchAddresses }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-2">Select Address</h3>

        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div key={addr._id} className="border p-2 mb-2">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  name="address" 
                  checked={selectedAddress === addr._id} 
                  onChange={() => setSelectedAddress(addr._id)} 
                  className="mr-2"
                />
                <span className="font-bold">{addr.name || "No Name"}</span>
                <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded">
                  {addr.type ? addr.type.toUpperCase() : "UNKNOWN"}
                </span>
              </div>
              <p>{addr.address_line}, {addr.city}, {addr.state} - {addr.pincode}, {addr.country || "India"}</p>
              <p>Mobile: {addr.mobile || "Not Provided"}</p>
            </div>
          ))
        ) : (
          <p>No addresses found. Please add one.</p>
        )}

        {!showForm ? (
          <button onClick={() => setShowForm(true)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
            Add New Address
          </button>
        ) : (
          <AForm token={token} fetchAddresses={fetchAddresses} setShowForm={setShowForm} />
        )}

        <button onClick={() => setShowAddressModal(false)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddressModal;
