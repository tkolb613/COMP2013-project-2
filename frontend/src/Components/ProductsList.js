import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsList({ products, onEditProduct, onDeleteProduct, onAddToCart }) {
if (!products || products.length === 0) return <p>Loading or no products found...</p>;

return (
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
{products.map((product) => ( <ProductCard
  key={product._id}
  id={product.id}
  _id={product._id}
  productName={product.productName}
  brand={product.brand}
  image={product.image}
  price={product.price}
  onEdit={onEditProduct}
  onDelete={onDeleteProduct}
  onAddToCart={onAddToCart}
/>
))} </div>
);
}
