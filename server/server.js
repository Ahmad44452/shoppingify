//////////// UPDATE CHECK
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");



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
app.use(express.json());


////////// API ROUTES
// const userApi = require("./routes/api/userApi");
// app.use("/api/user", userApi);
///////////////////////////////////////

app.get('/test', (req, res) => {
  return res.status(200).json('Server is running');
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is running!");
})