import React, { useState, useEffect } from "react";
import ProductsList from "./Components/ProductsList";
import NewProductForm from "./Components/NewProductForm";
import NavBar from "./Components/NavBar";
import CartContainer from "./Components/CartContainer";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [cartList, setCartList] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();

      const parsedData = data.map((p) => ({
        _id: p._id || "",
        id: p.id || p._id || "",
        productName: p.productName || "No name",
        brand: p.brand || "No brand",
        image: p.image || "",
        // Ensure price is always a number
        price: Number(p.price ? String(p.price).replace(/[^0-9.-]+/g, "") : 0),
      }));

      setProducts(parsedData);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleProductAdded = (newProduct) => {
    const parsedProduct = {
      _id: newProduct._id,
      id: newProduct.id || newProduct._id,
      productName: newProduct.productName,
      brand: newProduct.brand,
      image: newProduct.image,
      price: Number(
        newProduct.price ? String(newProduct.price).replace(/[^0-9.-]+/g, "") : 0
      ),
    };
    setProducts((prev) => [...prev, parsedProduct]);
  };

  // Delete product
  const handleDeleteProduct = async (_id) => {
    try {
      await fetch(`http://localhost:5000/products/${_id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p._id !== _id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Edit product
  const handleEditProduct = async (updatedProduct) => {
    try {
      // Send price as number to backend
      const res = await fetch(`http://localhost:5000/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedProduct,
          price: Number(updatedProduct.price),
        }),
      });
      const data = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p._id === data._id
            ? { ...data, price: Number(data.price) }
            : p
        )
      );
      setEditingProduct(null);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Add to cart
  const handleAddToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existing = cartList.find((item) => item.id === productId);
    if (existing) {
      setCartList((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartList((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCartList((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <NavBar quantity={cartList.length} />
      <h1>Grocery App</h1>

      <NewProductForm
        onProductAdded={handleProductAdded}
        editingProduct={editingProduct}
        onProductUpdated={handleEditProduct}
      />

      <ProductsList
        products={products}
        onEditProduct={setEditingProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddToCart={handleAddToCart}
      />

      <CartContainer cartList={cartList} handleRemoveFromCart={handleRemoveFromCart} />
    </div>
  );
}

export default App;
