import React from "react";

export default function ProductCard({ id, productName, brand, image, price, onAddToCart, onEdit, onDelete }) {
  return (
    <div
      className="ProductCard"
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        marginBottom: "20px",
      }}
    >
      <h3>{productName}</h3>
      <img
        src={image}
        alt={productName}
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
      />
      <h4>{brand}</h4>
      <h3>${Number(price).toFixed(2)}</h3>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => onAddToCart(id)}
          style={{
            marginRight: "5px",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>

        {onEdit && (
          <button
            onClick={() => onEdit({ _id: id, productName, brand, image, price })}
            style={{
              marginRight: "5px",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#dc3545",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
