const mongoose = require("mongoose");
const validateIsURL = require('validator/lib/isURL');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required!"],
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        return validateIsURL(value)
      },
      message: 'Invalid URL'
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required!"]
  }
})


const ItemModel = mongoose.model("Item", itemSchema);
module.exports = { ItemModel };