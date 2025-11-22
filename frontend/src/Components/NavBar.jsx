import React from "react";

export default function NavBar({ quantity }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        marginBottom: "20px",
      }}
    >
      <div>Hello, user</div>
      <h2>Groceries App 🍎</h2>
      <div>Cart Items: {quantity}</div>
    </nav>
  );
}
