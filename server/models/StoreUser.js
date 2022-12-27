const mongoose = require("mongoose");

const StoreUserSchema = mongoose.Schema({
  username: String,
  password: String,
  userType: {
    type: String,
    default: "user",
  },
  bookmarks: {
    type: Array,
    default: [String],
  },
  cart: {
    type: Array,
    default: [String],
  },
});
module.exports = mongoose.model("StoreUser", StoreUserSchema);
