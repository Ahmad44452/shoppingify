const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required!"],
    trim: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }],
  amount: {
    type: Number,
    default: 1
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }

})


const CartModel = mongoose.model("Cart", cartSchema);
module.exports = { CartModel };