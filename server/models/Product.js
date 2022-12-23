const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  img: {
    type: String,
    default: "https://picsum.photos/300",
  },
  productName: String,
  price: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et quam eu odio mattis efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur. ",
  },
  review: Number,
});
module.exports = mongoose.model("Product", ProductSchema);
