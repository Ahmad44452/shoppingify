//////////// UPDATE CHECK
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');


///////////// MONGO DB CONNECTION
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false);
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("DB Connected!");
});
///////////////////////////////////////



//////////// APPLY MIDDLEWARES
var corsOptions = {
  origin: process.env.FRONTEND_URI,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());


////////// API ROUTES
const itemApi = require("./routes/api/itemApi");
app.use("/api/item", itemApi);
const categoryApi = require("./routes/api/categoryApi");
app.use("/api/category", categoryApi);
const cartApi = require("./routes/api/cartApi");
app.use("/api/cart", cartApi);
///////////////////////////////////////

app.get('/test', (req, res) => {
  return res.status(200).json('Server is running');
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running!");
})