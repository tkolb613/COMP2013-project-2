import React from "react";
import "./App.css";
import ProductsList from "./ProductsList";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Grocery App V2</h1>
      <ProductsList />
    </div>
  );
}

export default App;