const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ------------------------
// Connect to MongoDB
// ------------------------
mongoose
  .connect("mongodb+srv://admin:database123@tutorial.ayxy0.mongodb.net/groceryAppV2")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ------------------------
// Product Schema
// ------------------------
const ProductSchema = new mongoose.Schema({
  id: String,
  productName: String,
  brand: String,
  image: String,
  price: String, // store price as string with $ for display
});

const Product = mongoose.model("Product", ProductSchema);

// ------------------------
// CRUD Routes
// ------------------------

// Home route
app.get("/", (req, res) => res.send("Backend is running!"));

// GET all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new product
app.post("/products", async (req, res) => {
  try {
    const productData = { ...req.body };
    if (productData.price && !productData.price.startsWith("$")) {
      productData.price = `$${parseFloat(productData.price).toFixed(2)}`;
    }
    const product = new Product(productData);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a product by ID
app.put("/products/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.price && !updateData.price.startsWith("$")) {
      updateData.price = `$${parseFloat(updateData.price).toFixed(2)}`;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------
// Start the server
// ------------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
