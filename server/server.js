const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const mongoose = require("mongoose");
const Product = require("./models/Product");
mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());

app.post("/add", (req, res) => {
  const newProduct = new Product({
    img: req.body.img,
    productName: req.body.productName,
    price: req.body.price,
  });
  newProduct
    .save()
    .then(() => res.json(`Product ${req.body.productName} added.`));
});
app.get("/items", (req, res) => {
  Product.find().then((item) => res.json(item));
});
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to db");
  app.listen(PORT, () => {
    console.log("Server running at port", PORT);
  });
});
