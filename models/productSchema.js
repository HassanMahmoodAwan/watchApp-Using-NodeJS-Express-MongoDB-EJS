var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  Name: String,
  Company: String,
  Category: String,
  Price: String,
  Quantity: String, 
  Img: String
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
