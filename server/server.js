const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const mongoose = require("mongoose");
const Product = require("./models/Product");
const StoreUser = require("./models/StoreUser");

mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());
app.post("/login", (req, res) => {
  StoreUser.findOne({ username: req.body.username }).then((user) => {
    if (user.password === req.body.password) res.json(true);
    else res.json(false);
  });
});
app.post("/get-bookmark", (req, res) => {
  StoreUser.findOne({ username: req.body.username }).then((user) => {
    if (user.bookmarks.includes(req.body.bookmark)) res.json(true);
    else res.json(false);
  });
});
app.post("/fetch-bookmark", async (req, res) => {
  let bookmarks = [];
  let queryArray = [];
  await StoreUser.findOne({ username: req.body.username }).then((user) => {
    bookmarks = user.bookmarks;
  });
  if (bookmarks.length === 0) {
    res.json([]);
    return;
  }
  bookmarks.forEach((b) => {
    let query = { _id: b };
    queryArray.push(query);
  });
  let queryString = { $or: queryArray };
  Product.find(queryString).then((products) => {
    res.json(products);
  });
});
app.post("/add-bookmark", async (req, res) => {
  let bookmarks = [];
  await StoreUser.findOne({ username: req.body.username }).then((user) => {
    bookmarks = user.bookmarks;
    if (bookmarks.includes(req.body.bookmark)) {
      let index = bookmarks.indexOf(req.body.bookmark);
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(req.body.bookmark);
    }
  });
  StoreUser.findOneAndUpdate(
    { username: req.body.username },
    { bookmarks: bookmarks }
  ).then(() => res.json({ username: req.body.username, bookmarks: bookmarks }));
});
app.get("/users", (req, res) => {
  StoreUser.find().then((users) => res.json(users));
});
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
