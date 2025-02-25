import React from "react";

const CartItem = ({ item, updateCart, removeFromCart, token }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex justify-between items-center mb-4 bg-white">
      <div>
        <h3 className="text-lg font-bold">{item.productId?.name || "Unknown Product"}</h3>
        <p className="text-start text-base">Quantity: {item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => updateCart(item.productId._id, item.quantity - 1, token)} className="bg-red-500 text-white px-3 py-1 rounded" disabled={item.quantity <= 1}>-</button>
        <button onClick={() => updateCart(item.productId._id, item.quantity + 1, token)} className="bg-green-500 text-white px-3 py-1 rounded">+</button>
        <button onClick={() => removeFromCart(item.productId._id, token)} className="bg-gray-600 text-white px-3 py-1 rounded">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
