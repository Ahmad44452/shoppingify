const mongoose = require("mongoose");

// const { itemSchema } = require('./itemModel')

// const itemSchemaForCart = itemSchema.add({
//   amount: {
//     type: Number,
//     default: 1
//   }
// })

const itemSchemaForCart = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Item is required!"],
    ref: "Item"
  },
  amount: {
    type: Number,
    default: 1
  },
  isChecked: {
    type: Boolean,
    default: false
  }
}, { _id: false })

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required!"],
    trim: true,
  },
  items: {
    type: [itemSchemaForCart],
    validate: {
      validator: function (array) {
        const itemsIdArray = array.map(item => item.item.toString())

        return (new Set(itemsIdArray)).size === itemsIdArray.length
      },
      message: 'Cart contains duplicate items!'
    }
  },
  status: {
    type: String,
    enum: ['cancelled', 'pending', 'completed'],
    default: 'pending'
  },
  date: {
    type: Date,
    default: Date.now()
  }

})


const CartModel = mongoose.model("Cart", cartSchema);
module.exports = { CartModel };