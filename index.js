const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodRoutes = require("./routes/foodRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/foods", foodRoutes);
app.use("/api/categories", categoryRoutes);

app.use('/', (req, res, next) => {
  res.send('Hello world.')
})

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@sayhan.fatp7.mongodb.net/test?retryWrites=true&w=majority&appName=Sayhan`
  )
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
