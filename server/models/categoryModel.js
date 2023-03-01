const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required!"],
    unique: [true, "Category name already exists!"],
    trim: true,
    lowercase: true
  }
})


const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = { CategoryModel };