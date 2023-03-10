const express = require('express');
let router = express.Router();


///////////// GET USER MODEL
const { CartModel } = require('../../models/cartModel')

router.route('/save').post(async (req, res) => {
  try {
    let cart;
    // if user is updating a cart, the request will contain its id
    // so instead of creating a new one, the current cart will be updated
    if (req.body._id) {
      cart = await CartModel.findById(req.body._id);
      // send error if cart does not exist
      if (!cart)
        return res.status(400).json({ message: "Cart does not exist" })

      // update cart with new name and new items
      cart.name = req.body.name;
      cart.items = req.body.items;
      cart.status = req.body.status;
    } else {
      pendingCartCheck = await CartModel.findOne({}, {}, { sort: { '_id': -1 } });

      if (pendingCartCheck && pendingCartCheck.status === 'pending')
        return res.status(400).json({ message: "A pending cart already exists!" });

      cart = new CartModel({
        name: req.body.name,
        items: req.body.items,
      })

    }
    let doc = await cart.save();

    if (doc.status === 'completed' || doc.status === 'cancelled')
      return res.status(200).json("Empty");

    await doc.populate('items.item');
    await doc.populate('items.item.category');
    doc = JSON.parse(JSON.stringify(doc));

    return res.status(200).json(formatCart(doc));



  } catch (error) {

    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

router.route('/lastpending').get(async (req, res) => {
  try {
    let latestCart = await CartModel.findOne({}, {}, { sort: { '_id': -1 } })

    // if there is no pending cart, send empty
    if (!latestCart || latestCart.status !== 'pending')
      return res.status(200).json("Empty")

    await latestCart.populate('items.item');
    await latestCart.populate('items.item.category');

    latestCart = JSON.parse(JSON.stringify(latestCart))
    return res.status(200).json(formatCart(latestCart))

  } catch (error) {

    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

router.route('/get/:id').get(async (req, res) => {
  try {

    const cart = await CartModel.findById(req.params.id).populate('items.item');
    await cart.populate('items.item.category');

    return res.status(200).json(cart);

  } catch (error) {

    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

router.route('/test').get(async (req, res) => {
  try {
    return res.status(200).json("Test Working")
  } catch (error) {
    return res.status(400).json({
      message: "Error",
      error: error
    })
  }
})

const formatCart = (cart) => {
  // items array directly is non-extensible
  // so first strignfiy and the parse to make a deep copy
  const itemsArray = cart.items;

  // filter out all categories from items array
  const allCategories = itemsArray.map((item) => item.item.category);

  // remove duplicates from the categories array
  const jsonObject = allCategories.map((category) => JSON.stringify(category));
  const uniqueCategories = Array.from(new Set(jsonObject)).map(JSON.parse);

  // put different items to their respective categories
  for (let i in itemsArray) {
    for (let j in uniqueCategories) {
      if (uniqueCategories[j]._id === itemsArray[i].item.category._id) {
        // delete nested category information
        delete itemsArray[i].item.category

        // move items data one 
        itemsArray[i] = {
          ...itemsArray[i],
          ...itemsArray[i].item
        }
        delete itemsArray[i].item
        // push the item in respective category if array exists
        if (uniqueCategories[j].items) {
          uniqueCategories[j].items.push(itemsArray[i]);
        } else {
          // create new array if it does not exist already
          uniqueCategories[j].items = [itemsArray[i]];
        }
        break;
      }
    }
  }

  delete cart.items;
  cart.categories = uniqueCategories;

  return cart;
};

module.exports = router;