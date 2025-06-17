const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: String,
  image: String,
  rating: Number
});

module.exports = mongoose.model("Product", productSchema);