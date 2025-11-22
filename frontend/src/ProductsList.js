import React from "react";

function ProductsList({ products, onDeleteProduct, onEditProduct }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Grocery Products</h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id} style={styles.card}>
              <img
                src={product.image}
                alt={product.productName}
                style={styles.image}
              />
              <h3>{product.productName}</h3>
              <p>Brand: {product.brand}</p>
              <p>Price: {product.price}</p>

              {/* Edit & Delete buttons */}
              <div style={styles.buttonContainer}>
                <button
                  onClick={() => onEditProduct(product)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteProduct(product._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#fafafa",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#FFA500",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#FF4C4C",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductsList;
