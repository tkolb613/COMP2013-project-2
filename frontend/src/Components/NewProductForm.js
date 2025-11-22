import React, { useState, useEffect } from "react";

export default function NewProductForm({ onProductAdded, editingProduct, onProductUpdated }) {
const [productName, setProductName] = useState("");
const [brand, setBrand] = useState("");
const [image, setImage] = useState("");
const [price, setPrice] = useState("");

useEffect(() => {
if (editingProduct) {
setProductName(editingProduct.productName || "");
setBrand(editingProduct.brand || "");
setImage(editingProduct.image || "");
setPrice(editingProduct.price !== undefined ? editingProduct.price : "");
} else {
setProductName("");
setBrand("");
setImage("");
setPrice("");
}
}, [editingProduct]);

const handleSubmit = async (e) => {
e.preventDefault();

const productData = {
  productName,
  brand,
  image,
  price: `$${parseFloat(price).toFixed(2)}`,
};

try {
  if (editingProduct) {
    onProductUpdated({ ...editingProduct, ...productData });
  } else {
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const newProduct = await res.json();
    if (onProductAdded) onProductAdded(newProduct);
  }

  setProductName("");
  setBrand("");
  setImage("");
  setPrice("");
} catch (err) {
  console.error("Error submitting product:", err);
}

};

return (
<form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
<input
type="text"
placeholder="Product Name"
value={productName}
onChange={(e) => setProductName(e.target.value)}
required
/>
<input
type="text"
placeholder="Brand"
value={brand}
onChange={(e) => setBrand(e.target.value)}
required
/>
<input
type="text"
placeholder="Image URL"
value={image}
onChange={(e) => setImage(e.target.value)}
required
/>
<input
type="number"
placeholder="Price"
value={price}
onChange={(e) => setPrice(e.target.value)}
step="0.01"
required
/> <button type="submit">{editingProduct ? "Update Product" : "Add Product"}</button> </form>
);
}
