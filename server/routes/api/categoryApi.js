const express = require('express');
let router = express.Router();


///////////// GET USER MODEL
const { CategoryModel } = require('../../models/categoryModel');
const { ItemModel } = require('../../models/itemModel');


// api to create a new category
router.route('/create').post(async (req, res) => {
  try {
    const category = new CategoryModel({
      name: req.body.name
    })

    const doc = await category.save();

    return res.status(200).json(doc);

  } catch (error) {

    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

// api to get names ONLY for all categories
router.route('/all').get(async (req, res) => {
  try {
    const allCategories = await CategoryModel.find();

    return res.status(200).json(allCategories)
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})


// api to get all categories with items in each category
router.route('/allwithitems').get(async (req, res) => {
  try {
    // get all categories
    const allCategories = await CategoryModel.find();

    // array that will contain all categories with items in them
    const allCategoriesWithItems = [];

    // loop through all categories and push items in that category
    for (category of allCategories) {
      // get items in current category from db
      const itemsInCategory = await ItemModel.find({ category: category._id })

      // combine current category and items in it in a single object
      const categoryWithItems = {
        // store data of current category
        ...category._doc,
        //remove excessive properties from all the items
        items: itemsInCategory.map(item => getItemsProps(item))
      }

      // push the current categories' finalized object in array containing all categories
      allCategoriesWithItems.push(categoryWithItems)
    }

    return res.status(200).json(allCategoriesWithItems)
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

// api to get items in a specific category
router.route('/items/:categoryId').get(async (req, res) => {
  try {
    // const categoryItems = await ItemModel.find({ category: req.params.categoryId }).populate('category')

    // get items in current category from db
    const category = await CategoryModel.findById(req.params.categoryId)

    if (!category)
      return res.status(400).json({ message: "Category not found!" });


    // get items in current category from db
    const itemsInCategory = await ItemModel.find({ category: req.params.categoryId })

    // combine current category and items in it in a single object
    const categoryWithItems = {
      // store data of current category
      ...category._doc,
      //remove excessive properties from all the items
      items: itemsInCategory.map(item => getItemsProps(item))
    }

    return res.status(200).json(categoryWithItems);

  } catch (error) {

    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

// function to remove excessive properties
const getItemsProps = (userObj) => ({
  _id: userObj._id,
  name: userObj.name
})

router.route('/test').get(async (req, res) => {
  try {
    return res.status(200).json("Category Test Working")
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

module.exports = router;