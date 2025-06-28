const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  rating: {type:Number, default: 1},
  price:  {type:Number, default: 320},
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Food", foodSchema);
