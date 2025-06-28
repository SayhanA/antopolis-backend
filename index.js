const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodRoutes = require("./routes/foodRoutes");
const categoryRoutes = require("./routes/categoryRoutes")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/foods", foodRoutes);
app.use("/api/categories", categoryRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
