const express = require("express");
const Food = require("../models/food");
const storage = require("../utils/store");
const router = express.Router();
const multer = require('multer')

const upload = multer({ storage });

// GET /api/foods?category=Lunch
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const foods = await Food.find(filter);

    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch foods" });
  }
});

// POST /api/foods
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category } = req.body;
    console.log({name, category})
    const image = req.file ? req.file.filename : null;

    const newFood = new Food({ name, category, image });
    await newFood.save();

    res.status(201).json({ message: "Food added successfully", food: newFood });
  } catch (err) {
    res.status(500).json({ error: "Failed to add food" });
  }
});

module.exports = router;
