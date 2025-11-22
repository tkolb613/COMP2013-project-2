import { useState } from "react";
import NavBar from "./NavBar";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";

export default function GroceriesAppContainer({ products }) {
  const [cartList, setCartList] = useState([]);

  const handleAddToCart = (product) => {
    const existing = cartList.find((p) => p.id === product.id);
    if (existing) {
      setCartList(
        cartList.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCartList([...cartList, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartList(cartList.filter((p) => p.id !== productId));
  };

  const handleAddQuantity = (productId) => {
    setCartList(
      cartList.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const handleRemoveQuantity = (productId) => {
    setCartList(
      cartList.map((p) =>
        p.id === productId && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const handleClearCart = () => setCartList([]);

  return (
    <div>
      <NavBar quantity={cartList.length} />
      <ProductsContainer products={products} handleAddToCart={handleAddToCart} />
      <CartContainer
        cartList={cartList}
        handleRemoveFromCart={handleRemoveFromCart}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        handleClearCart={handleClearCart}
      />
    </div>
  );
}
