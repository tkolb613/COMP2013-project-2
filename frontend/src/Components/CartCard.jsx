import QuantityCounter from "./QuantityCounter";

export default function CartCard({
  id,
  image,
  productName,
  price,
  quantity,
  handleRemoveFromCart,
  handleAddQuantity,
  handleRemoveQuantity,
}) {
  const numericPrice = parseFloat(price.replace("$", "")).toFixed(2);

  return (
    <div className="CartCard" style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <img src={image} alt={productName} style={{ width: "80px", height: "80px", objectFit: "cover" }} />
        <p>{productName}</p>
        <p>${numericPrice}</p>
        <QuantityCounter
          id={id}
          productQuantity={quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
        />
      </div>
      <div>
        <h3>Total: ${(numericPrice * quantity).toFixed(2)}</h3>
        <button onClick={() => handleRemoveFromCart(id)}>Remove</button>
      </div>
    </div>
  );
}
