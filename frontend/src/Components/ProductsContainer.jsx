import ProductCard from "./ProductCard";

export default function ProductsContainer({ products, handleAddToCart }) {
  return (
    <div className="ProductsContainer" style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
