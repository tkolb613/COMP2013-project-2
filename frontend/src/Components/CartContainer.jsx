import React from "react";

export default function CartContainer({ cartList, handleRemoveFromCart }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Cart Items</h2>
      {cartList.length === 0 && <p>No items in cart</p>}
      {cartList.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <img src={item.image} alt={item.productName} style={{ width: "50px", marginRight: "10px" }} />
          <div>
            <p>{item.productName}</p>
            <p>${item.price.toFixed(2)} x {item.quantity}</p>
          </div>
          <button onClick={() => handleRemoveFromCart(item.id)} style={{ marginLeft: "10px" }}>Remove</button>
        </div>
      ))}
      {cartList.length > 0 && (
        <h3>
          Total: $
          {cartList
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
      )}
    </div>
  );
}
