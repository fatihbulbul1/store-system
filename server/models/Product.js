const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  img: {
    type: String,
    default: "https://picsum.photos/200",
  },
  productName: String,
  price: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", ProductSchema);
