const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required!"],
    trim: true,
  }
})


const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = { CategoryModel };