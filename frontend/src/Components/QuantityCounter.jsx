export default function QuantityCounter({ id, productQuantity, handleAddQuantity, handleRemoveQuantity }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <button onClick={() => handleRemoveQuantity(id)}>-</button>
      <p>{productQuantity}</p>
      <button onClick={() => handleAddQuantity(id)}>+</button>
    </div>
  );
}
